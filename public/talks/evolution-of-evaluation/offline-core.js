/* eslint-env browser, serviceworker, es2022 */
(() => {
  "use strict";

  const BASE = "/talks/evolution-of-evaluation/";
  const PREFIX = "evolution-presentation-v1-";
  const STATE = "evolution-presentation-state-v1";
  const PROTOCOL = 1;

  function validateManifest(value, origin) {
    if (
      value?.schema !== PROTOCOL ||
      value.base !== BASE ||
      !/^[a-f0-9]{64}$/.test(value.version) ||
      !Array.isArray(value.assets) ||
      !value.assets.length
    )
      throw new Error("Invalid presentation inventory");
    const urls = new Set();
    let total = 0;
    for (const asset of value.assets) {
      const url = new URL(asset.url, origin + BASE);
      if (
        typeof asset.url !== "string" ||
        url.origin !== origin ||
        !url.pathname.startsWith(BASE) ||
        url.search ||
        url.hash ||
        urls.has(url.href) ||
        !Number.isSafeInteger(asset.bytes) ||
        asset.bytes < 0 ||
        !/^[a-f0-9]{64}$/.test(asset.sha256)
      )
        throw new Error("Invalid presentation asset");
      urls.add(url.href);
      total += asset.bytes;
    }
    if (total !== value.totalBytes)
      throw new Error("Invalid presentation size");
    return value;
  }

  async function digest(bytes, crypto = globalThis.crypto) {
    const hash = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(hash), (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");
  }

  function canonicalURL(input, origin) {
    const url = new URL(input, origin);
    if (url.origin !== origin || !url.pathname.startsWith(BASE))
      return undefined;
    if (url.pathname === BASE) url.pathname += "index.html";
    url.search = "";
    url.hash = "";
    return url.href;
  }

  function verifiedResponse(response, asset) {
    return (
      response?.status === 200 &&
      response.headers.get("x-presentation-sha256") === asset.sha256 &&
      Number(response.headers.get("content-length")) === asset.bytes
    );
  }

  async function rangeResponse(response, range) {
    if (!range) return response;
    // RFC 9110 permits ignoring ranges we do not implement, including multipart.
    const match = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
    if (!match || (!match[1] && !match[2])) return response;
    const body = await response.arrayBuffer();
    const size = body.byteLength;
    const first = match[1] ? Number(match[1]) : undefined;
    const last = match[2] ? Number(match[2]) : undefined;
    const start = first === undefined ? Math.max(0, size - last) : first;
    const end =
      first === undefined ? size - 1 : Math.min(last ?? size - 1, size - 1);
    const headers = new Headers(response.headers);
    headers.delete("content-encoding");
    headers.set("accept-ranges", "bytes");
    if (
      !Number.isSafeInteger(start) ||
      !Number.isSafeInteger(end) ||
      start < 0 ||
      start >= size ||
      end < start ||
      (first === undefined && (!Number.isSafeInteger(last) || last <= 0))
    ) {
      headers.set("content-range", `bytes */${size}`);
      headers.set("content-length", "0");
      return new Response(null, { status: 416, headers });
    }
    headers.set("content-range", `bytes ${start}-${end}/${size}`);
    headers.set("content-length", String(end - start + 1));
    return new Response(body.slice(start, end + 1), { status: 206, headers });
  }

  async function prepare(
    manifest,
    {
      origin = globalThis.location.origin,
      caches = globalThis.caches,
      fetch = globalThis.fetch.bind(globalThis),
      crypto = globalThis.crypto,
      onProgress = () => {},
      signal,
      concurrency = 3,
    } = {},
  ) {
    validateManifest(manifest, origin);
    const cacheName = PREFIX + manifest.version;
    const cache = await caches.open(cacheName);
    const reusable = await Promise.all(
      (await caches.keys())
        .filter((name) => name.startsWith(PREFIX) && name !== cacheName)
        .map((name) => caches.open(name)),
    );
    const abort = new AbortController();
    const cancel = () => abort.abort(signal?.reason);
    signal?.addEventListener("abort", cancel, { once: true });
    if (signal?.aborted) cancel();
    const inFlight = new Map();
    let completedBytes = 0;
    let completedFiles = 0;
    let cursor = 0;
    function report() {
      onProgress({
        bytes:
          completedBytes + [...inFlight.values()].reduce((a, b) => a + b, 0),
        completedBytes,
        completedFiles,
        totalBytes: manifest.totalBytes,
        totalFiles: manifest.assets.length,
      });
    }
    async function download(asset) {
      const url = new URL(asset.url, origin + BASE).href;
      for (const candidate of [cache, ...reusable]) {
        const existing = await candidate.match(url);
        if (!verifiedResponse(existing, asset)) continue;
        const bytes = await existing.arrayBuffer();
        if (
          bytes.byteLength === asset.bytes &&
          (await digest(bytes, crypto)) === asset.sha256
        ) {
          if (candidate !== cache)
            await cache.put(
              url,
              new Response(bytes, { headers: existing.headers }),
            );
          completedBytes += asset.bytes;
          completedFiles++;
          report();
          return;
        }
      }
      // A corrupt cached body must not be returned by our own fetch handler again.
      await cache.delete(url);
      const response = await fetch(url, {
        cache: "no-store",
        signal: abort.signal,
      });
      if (response.status !== 200 || !response.body)
        throw new Error("Download interrupted. Reconnect and retry.");
      const reader = response.body.getReader();
      const chunks = [];
      let size = 0;
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          size += value.byteLength;
          if (size > asset.bytes)
            throw new Error(
              "Presentation changed. Reload to download the latest version.",
            );
          chunks.push(value);
          inFlight.set(url, size);
          report();
        }
      } finally {
        await reader.cancel().catch(() => {});
      }
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.length;
      }
      if (
        size !== asset.bytes ||
        (await digest(bytes, crypto)) !== asset.sha256
      ) {
        throw new Error(
          "Presentation changed or download incomplete. Reload and retry.",
        );
      }
      const headers = new Headers(response.headers);
      headers.delete("content-encoding");
      headers.set("content-length", String(size));
      headers.set("x-presentation-sha256", asset.sha256);
      await cache.put(url, new Response(bytes, { status: 200, headers }));
      inFlight.delete(url);
      completedBytes += asset.bytes;
      completedFiles++;
      report();
    }
    async function runner() {
      while (cursor < manifest.assets.length && !abort.signal.aborted) {
        const asset = manifest.assets[cursor++];
        try {
          await download(asset);
        } catch (error) {
          abort.abort(error);
          throw error;
        }
      }
    }
    try {
      report();
      const results = await Promise.allSettled(
        Array.from({ length: Math.max(1, Math.min(4, concurrency)) }, runner),
      );
      const failed = results.find((result) => result.status === "rejected");
      if (failed) throw abort.signal.reason ?? failed.reason;
      if (abort.signal.aborted)
        throw abort.signal.reason ?? new Error("Download cancelled");
      if (completedFiles !== manifest.assets.length)
        throw new Error("Download incomplete");
      return { completedBytes, completedFiles };
    } finally {
      signal?.removeEventListener("abort", cancel);
    }
  }

  globalThis.PresentationOffline = {
    BASE,
    PREFIX,
    STATE,
    PROTOCOL,
    validateManifest,
    canonicalURL,
    digest,
    verifiedResponse,
    rangeResponse,
    prepare,
  };
})();
