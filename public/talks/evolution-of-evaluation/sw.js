/* eslint-env browser, serviceworker, es2022 */
importScripts("./offline-core.js");

const offline = self.PresentationOffline;
const origin = self.location.origin;
const scope = origin + offline.BASE;
const metaURL = (key) => scope + "__offline/" + key;

async function readState(key) {
  const cache = await caches.open(offline.STATE);
  const response = await cache.match(metaURL(key));
  return response ? response.json() : undefined;
}

async function writeState(key, value) {
  const cache = await caches.open(offline.STATE);
  await cache.put(metaURL(key), Response.json(value));
}

async function pin(clientId, version) {
  if (clientId && /^[a-f0-9]{64}$/.test(version)) {
    await writeState("client/" + clientId, { version });
  }
}

async function collectUnusedVersions(version) {
  const clients = await self.clients.matchAll({ includeUncontrolled: true });
  const keep = new Set([offline.PREFIX + version]);
  for (const client of clients) {
    if (!client.url.startsWith(scope)) continue;
    const pinned = await readState("client/" + client.id);
    if (pinned) keep.add(offline.PREFIX + pinned.version);
  }
  for (const name of await caches.keys()) {
    if (name.startsWith(offline.PREFIX) && !keep.has(name))
      await caches.delete(name);
  }
}

self.addEventListener("activate", (event) => {
  // Updates wait for existing tabs to close; never replace a running talk.
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  const port = event.ports[0];
  if (!port || !event.source?.url?.startsWith(scope)) return;
  event.waitUntil(
    (async () => {
      try {
        const { type, version } = event.data ?? {};
        if (!/^[a-f0-9]{64}$/.test(version))
          throw new Error("Invalid presentation version");
        if (type === "PIN") {
          const manifest = offline.validateManifest(
            event.data.manifest,
            origin,
          );
          if (manifest.version !== version)
            throw new Error("Presentation version mismatch");
          await writeState("manifest/" + version, manifest);
          await pin(event.source.id, version);
        } else if (type === "MANIFEST") {
          const manifest = await readState("manifest/" + version);
          port.postMessage({ protocol: offline.PROTOCOL, manifest });
          return;
        } else if (type === "COMPLETE") {
          const manifest = await readState("manifest/" + version);
          offline.validateManifest(manifest, origin);
          const cache = await caches.open(offline.PREFIX + version);
          for (const asset of manifest.assets) {
            const response = await cache.match(new URL(asset.url, scope));
            if (!offline.verifiedResponse(response, asset))
              throw new Error("Presentation download incomplete");
          }
          await pin(event.source.id, version);
          await writeState("ready", { version });
          await collectUnusedVersions(version);
        } else throw new Error("Unknown presentation request");
        port.postMessage({ protocol: offline.PROTOCOL, version });
      } catch (error) {
        port.postMessage({ error: error.message });
      }
    })(),
  );
});

async function navigation(event) {
  try {
    const response = await fetch(event.request, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error("Presentation unavailable");
    const html = await response.clone().text();
    const version = html.match(
      /name="presentation-cache-version" content="([a-f0-9]{64})"/,
    )?.[1];
    if (!version) throw new Error("Presentation unavailable");
    await pin(event.resultingClientId, version);
    return response;
  } catch {
    const ready = await readState("ready");
    if (ready) {
      const cache = await caches.open(offline.PREFIX + ready.version);
      const response = await cache.match(scope + "index.html");
      if (response) {
        await pin(event.resultingClientId, ready.version);
        return response;
      }
    }
    return new Response(
      "This presentation has not finished downloading. Reconnect and open the URL again.",
      {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      },
    );
  }
}

async function assetResponse(event, url) {
  const selected = await readState("client/" + event.clientId);
  if (selected) {
    const manifest = await readState("manifest/" + selected.version);
    const asset = manifest?.assets.find(
      (entry) => new URL(entry.url, scope).href === url,
    );
    if (asset) {
      const cache = await caches.open(offline.PREFIX + selected.version);
      const response = await cache.match(url);
      if (offline.verifiedResponse(response, asset)) {
        return offline.rangeResponse(
          response,
          event.request.headers.get("range"),
        );
      }
    }
  }
  return fetch(event.request);
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = offline.canonicalURL(event.request.url, origin);
  if (!url) return;
  if (event.request.mode === "navigate" && url === scope + "index.html") {
    event.respondWith(navigation(event));
  } else {
    event.respondWith(assetResponse(event, url));
  }
});
