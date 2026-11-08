/* eslint-env node, es2022 */
import test from "node:test";
import assert from "node:assert/strict";
import { createHash, webcrypto } from "node:crypto";
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runInNewContext } from "node:vm";
import { writePresentationManifest } from "../src/build/presentation-cache.mjs";
import "../public/talks/evolution-of-evaluation/offline-core.js";

const core = globalThis.PresentationOffline;
const origin = "https://example.test";
const scope = origin + core.BASE;
const hash = (body) => createHash("sha256").update(body).digest("hex");
const url = (input) =>
  typeof input === "string" ? input : input.url ?? input.href;

function cacheStorage({ quota = false } = {}) {
  const stores = new Map();
  return {
    async keys() {
      return [...stores.keys()];
    },
    async delete(name) {
      return stores.delete(name);
    },
    async open(name) {
      if (!stores.has(name)) stores.set(name, new Map());
      const entries = stores.get(name);
      return {
        async match(key) {
          return entries.get(url(key))?.clone();
        },
        async put(key, value) {
          if (quota) throw new DOMException("Full", "QuotaExceededError");
          entries.set(url(key), value.clone());
        },
        async delete(key) {
          return entries.delete(url(key));
        },
      };
    },
  };
}

function inventory(version = "a".repeat(64), movie = "01234567") {
  const bodies = new Map([
    [
      "index.html",
      `<meta name="presentation-cache-version" content="${version}">`,
    ],
    ["museum/test.mp4", movie],
    ["assets/test.js", "console.log('slide')"],
  ]);
  const assets = [...bodies].map(([name, body]) => ({
    url: name,
    bytes: Buffer.byteLength(body),
    sha256: hash(body),
  }));
  return {
    manifest: {
      schema: 1,
      base: core.BASE,
      version,
      assets,
      totalBytes: assets.reduce((n, asset) => n + asset.bytes, 0),
    },
    fetch: async (input) =>
      new Response(
        bodies.get(new URL(url(input)).pathname.slice(core.BASE.length)),
        { headers: { "content-type": "video/mp4" } },
      ),
  };
}

test("inventory generation is deterministic, content-versioned and avoids circular HTML hashes", () => {
  const root = mkdtempSync(join(tmpdir(), "presentation-cache-"));
  try {
    mkdirSync(join(root, "assets"));
    writeFileSync(
      join(root, "index.html"),
      '<head><link rel="preload" as="image" href="unused.png"></head>',
    );
    writeFileSync(join(root, "assets/test.js"), "one");
    writeFileSync(join(root, ".DS_Store"), "ignored");
    assert.throws(
      () => writePresentationManifest(root),
      /Missing presentation cache runtime/,
    );
    for (const name of ["offline-core.js", "offline-client.js", "sw.js"]) {
      writeFileSync(join(root, name), "stub");
    }
    const first = writePresentationManifest(root);
    const html = readFileSync(join(root, "index.html"));
    assert.equal(first.assets.length, 5);
    assert.equal(
      first.assets.find((a) => a.url === "index.html").sha256,
      hash(html),
    );
    assert.equal(first.totalBytes, html.byteLength + 3 + 3 * 4);
    assert.ok(!html.toString().includes('as="image"'));
    assert.ok(html.toString().includes("offline-client.js"));
    assert.deepEqual(writePresentationManifest(root), first);
    writeFileSync(join(root, "assets/test.js"), "two");
    assert.notEqual(writePresentationManifest(root).version, first.version);
  } finally {
    rmSync(root, { recursive: true });
  }
});

test("manifests are confined to this deck and reject duplicates, missing paths, hashes and wrong totals", () => {
  const { manifest } = inventory();
  assert.equal(core.validateManifest(manifest, origin), manifest);
  for (const change of [
    (m) => {
      m.base = "/";
    },
    (m) => {
      m.assets[0].url = "../../private";
    },
    (m) => {
      m.assets[0].url = "https://other.test/asset";
    },
    (m) => {
      m.assets[0].url = undefined;
    },
    (m) => {
      m.assets[0].sha256 = "bad";
    },
    (m) => {
      m.assets.push(m.assets[0]);
    },
    (m) => {
      m.totalBytes++;
    },
  ]) {
    const altered = structuredClone(manifest);
    change(altered);
    assert.throws(() => core.validateManifest(altered, origin));
  }
  assert.equal(
    core.canonicalURL(scope + "?presenter=1", origin),
    scope + "index.html",
  );
  assert.equal(core.canonicalURL(origin + "/talks/other/", origin), undefined);
});

for (const [range, status, expected, contentRange] of [
  ["bytes=1-3", 206, "123", "bytes 1-3/8"],
  ["bytes=5-", 206, "567", "bytes 5-7/8"],
  ["bytes=-3", 206, "567", "bytes 5-7/8"],
  ["bytes=0-999", 206, "01234567", "bytes 0-7/8"],
  ["bytes=-999", 206, "01234567", "bytes 0-7/8"],
  ["bytes=8-", 416, "", "bytes */8"],
  ["bytes=4-2", 416, "", "bytes */8"],
  ["bytes=-0", 416, "", "bytes */8"],
  ["bytes=99999999999999999999-", 416, "", "bytes */8"],
  ["bytes=0-1,3-4", 200, "01234567", null],
  ["nonsense", 200, "01234567", null],
]) {
  test(`cached video range ${range}`, async () => {
    const response = await core.rangeResponse(
      new Response("01234567", { headers: { "content-type": "video/mp4" } }),
      range,
    );
    assert.equal(response.status, status);
    assert.equal(response.headers.get("content-range"), contentRange);
    assert.equal(response.headers.get("content-type"), "video/mp4");
    assert.equal(await response.text(), expected);
    if (status !== 200)
      assert.equal(
        Number(response.headers.get("content-length")),
        expected.length,
      );
  });
}

test("complete files resume without network, with accurate byte progress and content integrity", async () => {
  const caches = cacheStorage();
  const { manifest, fetch } = inventory();
  const states = [];
  await core.prepare(manifest, {
    origin,
    caches,
    fetch,
    crypto: webcrypto,
    onProgress: (s) => states.push(s),
  });
  assert.equal(states.at(-1).completedBytes, manifest.totalBytes);
  assert.equal(states.at(-1).completedFiles, manifest.assets.length);
  assert.ok(states.every((s) => s.bytes <= s.totalBytes));
  await core.prepare(manifest, {
    origin,
    caches,
    fetch: () => {
      throw new Error("No network allowed");
    },
  });
});

test("interrupted downloads retain completed files and retry missing files only", async () => {
  const caches = cacheStorage();
  const { manifest, fetch } = inventory();
  await assert.rejects(
    core.prepare(manifest, {
      origin,
      caches,
      concurrency: 1,
      fetch: (u) => {
        if (u.endsWith(".mp4")) throw new Error("Disconnected");
        return fetch(u);
      },
    }),
    /Disconnected/,
  );
  const requested = [];
  await core.prepare(manifest, {
    origin,
    caches,
    fetch: (u) => {
      requested.push(u);
      return fetch(u);
    },
  });
  assert.equal(
    requested.some((u) => u.endsWith("index.html")),
    false,
  );
  assert.equal(requested.length, 2);
});

test("a new version reuses unchanged verified media without downloading it again", async () => {
  const caches = cacheStorage();
  const first = inventory();
  await core.prepare(first.manifest, { origin, caches, fetch: first.fetch });
  const second = inventory("b".repeat(64));
  const requested = [];
  await core.prepare(second.manifest, {
    origin,
    caches,
    fetch: (u) => {
      requested.push(u);
      return second.fetch(u);
    },
  });
  assert.deepEqual(requested, [scope + "index.html"]);
});

test("corrupt bodies are replaced, never repeatedly served back by the cache", async () => {
  const caches = cacheStorage();
  const { manifest, fetch } = inventory();
  await core.prepare(manifest, { origin, caches, fetch });
  const cache = await caches.open(core.PREFIX + manifest.version);
  const asset = manifest.assets[1];
  await cache.put(
    scope + asset.url,
    new Response("corrupt!", {
      headers: { "x-presentation-sha256": asset.sha256, "content-length": "8" },
    }),
  );
  let requested = 0;
  await core.prepare(manifest, {
    origin,
    caches,
    fetch: (u) => {
      requested++;
      return fetch(u);
    },
  });
  assert.equal(requested, 1);
});

test("partial, truncated, altered and quota-failed downloads never become complete assets", async () => {
  const { manifest } = inventory();
  for (const fetch of [
    async () => new Response("partial", { status: 206 }),
    async () => new Response("truncated"),
    async () => new Response("x".repeat(manifest.assets[0].bytes)),
  ]) {
    await assert.rejects(
      core.prepare(manifest, {
        origin,
        caches: cacheStorage(),
        fetch,
        concurrency: 1,
      }),
    );
  }
  const fixture = inventory();
  await assert.rejects(
    core.prepare(manifest, {
      origin,
      caches: cacheStorage({ quota: true }),
      fetch: fixture.fetch,
    }),
    { name: "QuotaExceededError" },
  );
});

function worker(
  caches,
  clients,
  fetch = async () => {
    throw new Error("Offline");
  },
) {
  const handlers = {};
  const self = {
    PresentationOffline: core,
    location: { origin },
    clients: { claim: async () => {}, matchAll: async () => clients },
    addEventListener: (name, handler) => {
      handlers[name] = handler;
    },
  };
  runInNewContext(
    readFileSync(
      new URL("../public/talks/evolution-of-evaluation/sw.js", import.meta.url),
      "utf8",
    ),
    {
      importScripts() {},
      self,
      caches,
      fetch,
      URL,
      Response,
      AbortSignal,
    },
  );
  return {
    async message(client, data) {
      let reply;
      let pending;
      handlers.message({
        data,
        source: client,
        ports: [
          {
            postMessage(value) {
              reply = value;
            },
          },
        ],
        waitUntil(value) {
          pending = value;
        },
      });
      await pending;
      return reply;
    },
    async request(
      client,
      path,
      { navigation = false, resultingClientId = "", range } = {},
    ) {
      let response;
      handlers.fetch({
        clientId: client.id,
        resultingClientId,
        request: {
          method: "GET",
          url: path,
          mode: navigation ? "navigate" : "cors",
          headers: new Headers(range ? { range } : {}),
        },
        respondWith(value) {
          response = value;
        },
      });
      return response;
    },
  };
}

test("worker pins versions durably, audits readiness, serves offline ranges/reloads and leaves other talks alone", async () => {
  const caches = cacheStorage();
  const old = inventory();
  const oldClient = { id: "old", url: scope };
  const newer = { id: "new", url: scope };
  const clients = [oldClient, newer];
  let runtime = worker(caches, clients);
  assert.equal(
    (
      await runtime.message(oldClient, {
        type: "PIN",
        version: old.manifest.version,
        manifest: old.manifest,
      })
    ).version,
    old.manifest.version,
  );
  assert.match(
    (
      await runtime.message(oldClient, {
        type: "COMPLETE",
        version: old.manifest.version,
      })
    ).error,
    /incomplete/,
  );
  await core.prepare(old.manifest, { origin, caches, fetch: old.fetch });
  assert.equal(
    (
      await runtime.message(oldClient, {
        type: "COMPLETE",
        version: old.manifest.version,
      })
    ).error,
    undefined,
  );
  const fresh = inventory("b".repeat(64), "abcdefgh");
  await runtime.message(newer, {
    type: "PIN",
    version: fresh.manifest.version,
    manifest: fresh.manifest,
  });
  await core.prepare(fresh.manifest, { origin, caches, fetch: fresh.fetch });
  await runtime.message(newer, {
    type: "COMPLETE",
    version: fresh.manifest.version,
  });
  // A new worker instance models suspension/restart: no in-memory pins survive.
  runtime = worker(caches, clients);
  const response = await runtime.request(oldClient, scope + "museum/test.mp4", {
    range: "bytes=1-3",
  });
  assert.equal(response.status, 206);
  assert.equal(await response.text(), "123");
  assert.equal(
    await (await runtime.request(newer, scope + "museum/test.mp4")).text(),
    "abcdefgh",
  );
  const shell = await runtime.request(newer, scope + "?slide=9", {
    navigation: true,
    resultingClientId: "offline-reload",
  });
  assert.ok((await shell.text()).includes(fresh.manifest.version));
  const restored = { id: "offline-reload", url: scope };
  assert.equal(
    await (await runtime.request(restored, scope + "museum/test.mp4")).text(),
    "abcdefgh",
  );
  assert.equal(
    await runtime.request(newer, origin + "/talks/other/"),
    undefined,
  );
  assert.equal(
    await runtime.request(newer, "https://elsewhere.test/file"),
    undefined,
  );
  clients.splice(0, 1);
  await runtime.message(newer, {
    type: "COMPLETE",
    version: fresh.manifest.version,
  });
  assert.equal(
    (await caches.keys()).includes(core.PREFIX + old.manifest.version),
    false,
  );
});
