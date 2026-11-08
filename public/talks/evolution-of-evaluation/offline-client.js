/* global PresentationOffline */
(() => {
  "use strict";
  const offline = PresentationOffline;
  const version = document.querySelector(
    'meta[name="presentation-cache-version"]',
  )?.content;
  if (!version) return;
  const host = document.createElement("div");
  host.id = "presentation-cache";
  host.dataset.state = "starting";
  const view = host.attachShadow({ mode: "open" });
  view.innerHTML = `<style>
    :host{position:fixed;top:12px;left:12px;z-index:10000;max-width:calc(100vw - 24px);font:14px/1.4 Arial,sans-serif;color:#173247}
    section{box-sizing:border-box;width:340px;max-width:100%;padding:14px 16px;background:#fffdf6;border:1px solid #cdd6d8;border-radius:8px;box-shadow:0 3px 20px #0003}
    h2{font-size:15px;line-height:1.3;margin:0 45px 6px 0}p{margin:4px 0;font-size:12px}
    progress{width:100%;height:8px;accent-color:#167d8d}button{font:inherit;cursor:pointer;border:1px solid #bac7ca;border-radius:4px;background:white;color:inherit;padding:4px 8px;margin-top:8px}
    #hide{position:absolute;right:12px;top:8px;border:0;font-size:12px;background:transparent}
    [hidden]{display:none!important}:host([hidden]){display:none!important}
    :host([data-state="ready"]) h2{color:#23633c}:host([data-state="error"]) h2{color:#8b361b}
    @media print{:host{display:none}}
  </style><section aria-label="Presentation download">
    <h2 role="status" aria-live="polite">Preparing presentation</h2>
    <button id="hide" type="button" aria-label="Hide download status">Hide</button>
    <progress aria-label="Presentation download progress" max="1" value="0"></progress>
    <p id="detail">Starting local storage…</p>
    <p id="hint">Keep this tab open until all slides and videos are downloaded.</p>
    <button id="retry" type="button" hidden>Retry download</button>
    <button id="reload" type="button" hidden>New version available — reload</button>
  </section>`;
  document.body.append(host);
  const title = view.querySelector("h2");
  const detail = view.querySelector("#detail");
  const hint = view.querySelector("#hint");
  const progress = view.querySelector("progress");
  const retry = view.querySelector("#retry");
  const reload = view.querySelector("#reload");
  view.querySelector("#hide").onclick = () => {
    host.hidden = true;
  };
  reload.onclick = () => location.reload();
  let running = false;
  let lastPaint = 0;
  let updatesAvailable = false;
  const formatBytes = (value) => (value / 1024 / 1024).toFixed(1) + " MB";

  function message(type, extra = {}) {
    return new Promise((resolve, reject) => {
      const worker = navigator.serviceWorker.controller;
      if (!worker)
        return reject(
          new Error("Presentation storage is not connected. Reload and retry."),
        );
      const channel = new MessageChannel();
      const timer = setTimeout(() => {
        channel.port1.close();
        reject(
          new Error("Presentation storage did not respond. Reload and retry."),
        );
      }, 30000);
      channel.port1.onmessage = ({ data }) => {
        clearTimeout(timer);
        channel.port1.close();
        if (data.error) reject(new Error(data.error));
        else if (data.protocol !== offline.PROTOCOL)
          reject(
            new Error(
              "Close other presentation tabs, then reload to update storage.",
            ),
          );
        else resolve(data);
      };
      worker.postMessage({ type, version, ...extra }, [channel.port2]);
    });
  }

  async function controller() {
    const registration = await navigator.serviceWorker.register(
      offline.BASE + "sw.js",
      {
        scope: offline.BASE,
        updateViaCache: "none",
      },
    );
    if (!navigator.serviceWorker.controller) {
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          navigator.serviceWorker.removeEventListener(
            "controllerchange",
            changed,
          );
          reject(
            new Error(
              "Presentation storage could not start. Reload and retry.",
            ),
          );
        }, 30000);
        function changed() {
          if (!navigator.serviceWorker.controller) return;
          clearTimeout(timeout);
          navigator.serviceWorker.removeEventListener(
            "controllerchange",
            changed,
          );
          resolve();
        }
        navigator.serviceWorker.addEventListener("controllerchange", changed);
        changed();
      });
    }
    const ownScope = new URL(navigator.serviceWorker.controller.scriptURL)
      .pathname;
    if (
      ownScope !== offline.BASE + "sw.js" ||
      registration.scope !== location.origin + offline.BASE
    ) {
      throw new Error(
        "Another website worker controls this page. Reload to connect presentation storage.",
      );
    }
  }

  async function publishedManifest() {
    const response = await fetch(offline.BASE + "offline-manifest.json", {
      cache: "no-store",
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok)
      throw new Error(
        "Cannot download the presentation inventory. Reconnect and retry.",
      );
    return offline.validateManifest(await response.json(), location.origin);
  }

  function showUpdate(manifest) {
    if (manifest.version !== version) {
      updatesAvailable = true;
      reload.hidden = false;
      host.hidden = false;
    }
  }

  async function inventory() {
    const stored = (await message("MANIFEST")).manifest;
    let published;
    try {
      published = await publishedManifest();
    } catch (error) {
      if (!stored) throw error;
    }
    if (published) {
      showUpdate(published);
      if (published.version === version) return published;
    }
    if (stored) return offline.validateManifest(stored, location.origin);
    throw new Error(
      "The presentation was updated. Reload to download the latest version.",
    );
  }

  function draw(state) {
    const now = performance.now();
    if (now - lastPaint < 150 && state.completedFiles < state.totalFiles)
      return;
    lastPaint = now;
    progress.max = state.totalBytes;
    progress.value = state.bytes;
    detail.textContent = `${formatBytes(state.bytes)} / ${formatBytes(state.totalBytes)} · ${state.completedFiles} / ${state.totalFiles} files saved`;
    host.dataset.bytes = String(state.completedBytes);
    host.dataset.files = String(state.completedFiles);
  }

  async function start() {
    if (running) return;
    running = true;
    host.dataset.state = "downloading";
    host.hidden = false;
    retry.hidden = true;
    title.textContent = "Preparing presentation";
    hint.textContent =
      "Keep this tab open until all slides and videos are downloaded.";
    try {
      if (
        !window.isSecureContext ||
        !("serviceWorker" in navigator) ||
        !("caches" in window)
      ) {
        throw new Error(
          "This browser cannot save the presentation. Open this URL in a current Chrome, Edge, Firefox or Safari.",
        );
      }
      await controller();
      const manifest = await inventory();
      await message("PIN", { manifest });
      navigator.storage?.persist?.().catch(() => {});
      const status = await offline.prepare(manifest, { onProgress: draw });
      title.textContent = "Verifying presentation";
      await message("COMPLETE");
      host.dataset.state = "ready";
      progress.value = manifest.totalBytes;
      title.textContent = "Ready offline";
      const videos = manifest.assets.filter((asset) =>
        asset.url.endsWith(".mp4"),
      ).length;
      detail.textContent = `All slides and ${videos} videos are stored on this computer.`;
      hint.textContent =
        "You can present without an internet connection. Hide this panel when ready.";
      host.dataset.bytes = String(status.completedBytes);
      host.dataset.files = String(status.completedFiles);
      host.dataset.version = manifest.version;
    } catch (error) {
      host.dataset.state = "error";
      host.hidden = false;
      title.textContent = "Download not complete";
      detail.textContent =
        error.name === "QuotaExceededError"
          ? "Not enough browser storage. Free storage, then retry."
          : error.name === "SecurityError"
            ? "Browser storage is blocked. Allow storage for this website, then retry."
            : error.message;
      hint.textContent =
        "Completed files are kept. Retry to continue downloading.";
      retry.hidden = false;
    } finally {
      running = false;
    }
  }

  async function checkUpdate() {
    if (host.dataset.state !== "ready" || updatesAvailable) return;
    try {
      showUpdate(await publishedManifest());
    } catch {
      /* The downloaded talk stays available offline. */
    }
  }
  retry.onclick = start;
  window.addEventListener("online", () => {
    if (host.dataset.state === "error") start();
    else checkUpdate();
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) checkUpdate();
  });
  start();
})();
