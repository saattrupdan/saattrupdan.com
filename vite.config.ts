import { fileURLToPath, URL } from "node:url";
import { readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { defineConfig } from "vite";
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

export default defineConfig({
  plugins: [
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
