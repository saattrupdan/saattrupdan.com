/* eslint-env node, es2022 */
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

export const presentationBase = "/talks/evolution-of-evaluation/";
const marker = /(<meta name="presentation-cache-version" content=")[^"]*(">)/;
const placeholder = "__PRESENTATION_VERSION__";
const hash = (value) => createHash("sha256").update(value).digest("hex");

function writeChanged(path, value) {
  try {
    if (readFileSync(path, "utf8") === value) return;
  } catch {
    /* First generation. */
  }
  writeFileSync(path, value);
}

function listFiles(root, directory = root) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith(".")) return [];
    const path = join(directory, entry.name);
    if (entry.isSymbolicLink())
      throw new Error("Presentation assets must not be symlinks");
    return entry.isDirectory()
      ? listFiles(root, path)
      : [relative(root, path).split("\\").join("/")];
  });
}

export function writePresentationManifest(root) {
  const index = join(root, "index.html");
  let html = readFileSync(index, "utf8");
  // Re-exporting the deck must not restore the image-preload flood.
  html = html.replace(/<link rel="preload" as="image"[^>]*>\s*/g, "");
  html = html.replace(
    /<link rel="icon"[^>]*>/,
    `<link rel="icon" href="${presentationBase}assets/logo-BYkHSa_O.png">`,
  );
  if (!marker.test(html)) {
    html = html.replace(
      "</head>",
      `<meta name="presentation-cache-version" content="${placeholder}">\n</head>`,
    );
  }
  if (!html.includes(`${presentationBase}offline-client.js`)) {
    html = html.replace(
      "</head>",
      `<script defer src="${presentationBase}offline-core.js"></script>\n<script defer src="${presentationBase}offline-client.js"></script>\n</head>`,
    );
  }
  html = html.replace(marker, `$1${placeholder}$2`);
  const names = listFiles(root)
    .filter((name) => name !== "offline-manifest.json")
    .sort();
  for (const name of ["offline-core.js", "offline-client.js", "sw.js"]) {
    if (!names.includes(name))
      throw new Error(`Missing presentation cache runtime: ${name}`);
  }
  const assets = names.map((name) => {
    const bytes =
      name === "index.html"
        ? Buffer.from(html)
        : readFileSync(join(root, name));
    return { url: encodeURI(name), bytes: bytes.length, sha256: hash(bytes) };
  });
  const version = hash(
    JSON.stringify({ schema: 1, base: presentationBase, assets }),
  );
  const finalHTML = html.replace(placeholder, version);
  const indexAsset = assets.find((asset) => asset.url === "index.html");
  indexAsset.bytes = Buffer.byteLength(finalHTML);
  indexAsset.sha256 = hash(finalHTML);
  const manifest = {
    schema: 1,
    base: presentationBase,
    version,
    totalBytes: assets.reduce((total, asset) => total + asset.bytes, 0),
    assets,
  };
  writeChanged(index, finalHTML);
  writeChanged(
    join(root, "offline-manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );
  return manifest;
}

export function presentationCachePlugin(projectRoot) {
  const root = resolve(projectRoot, "public", presentationBase.slice(1));
  return {
    name: "prepare-presentation-cache",
    buildStart() {
      writePresentationManifest(root);
    },
    configureServer(server) {
      writePresentationManifest(root);
      let timer;
      const changed = (path) => {
        if (
          !path.startsWith(root + "/") ||
          path.endsWith("offline-manifest.json")
        )
          return;
        clearTimeout(timer);
        timer = setTimeout(() => writePresentationManifest(root), 100);
      };
      server.watcher.on("change", changed);
      server.watcher.on("add", changed);
      server.watcher.on("unlink", changed);
      server.httpServer?.once("close", () => {
        clearTimeout(timer);
        for (const event of ["change", "add", "unlink"])
          server.watcher.off(event, changed);
      });
      server.middlewares.use((req, res, next) => {
        const path = (req.url ?? "").split("?")[0];
        if (
          path.startsWith(presentationBase) &&
          !path.slice(presentationBase.length).includes("/")
        ) {
          res.setHeader("Cache-Control", "no-cache");
        }
        next();
      });
    },
  };
}
