import { fileURLToPath, URL } from "node:url";
import { existsSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { defineConfig, type Plugin } from "vite";
import Vue from "@vitejs/plugin-vue";
import Markdown from "vite-plugin-md";
import MarkdownItAnchor from "markdown-it-anchor";
import pluginYaml from "vite-plugin-yaml2";
import Sitemap from "vite-plugin-sitemap";
import { routes } from "./src/frontend/router/routes.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const postsDir = resolve(__dirname, "src/frontend/posts");
const postNames = readdirSync(postsDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""));

const staticRoutes = routes
  .map((route) => route.path)
  .filter((route) => route !== "/posts/:id");
const dynamicRoutes = [
  ...staticRoutes,
  ...postNames.map((name) => `/posts/${name}`),
];

// Dev-only: mirror Vercel's behaviour for /talks/<slug>(/). Vite's dev
// server doesn't auto-serve directory index.html files, so these paths
// would otherwise fall through to the SPA shell and render blank.
function staticTalksDevServer(): Plugin {
  return {
    name: "serve-talks-index",
    apply: "serve",
    configureServer(server) {
      const publicDir = resolve(
        fileURLToPath(new URL("./public", import.meta.url)),
      );
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        const match = url.match(/^\/talks\/([^/]+)\/?$/);
        if (match) {
          const indexPath = resolve(publicDir, "talks", match[1], "index.html");
          if (existsSync(indexPath)) {
            req.url = `/talks/${match[1]}/index.html`;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    staticTalksDevServer(),
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      markdownItSetup(md) {
        md.use(MarkdownItAnchor, {
          permalink: MarkdownItAnchor.permalink.ariaHidden({
            placement: "before",
          }),
          slugify: function (s) {
            return encodeURIComponent(
              String(s)
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-zA-Z0-9-]+/g, ""),
            );
          },
        });
      },
    }),
    pluginYaml(),
    Sitemap({ hostname: "https://saattrupdan.com", dynamicRoutes }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src/frontend", import.meta.url)),
    },
  },
});
