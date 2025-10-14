import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Markdown from "vite-plugin-md";
import MarkdownItAnchor from "markdown-it-anchor";
import pluginYaml from "vite-plugin-yaml2";
import Sitemap from "vite-plugin-sitemap";
import { routes } from "./src/frontend/router/routes.ts";
import postNames from "./src/frontend/posts/postNames.ts";

// Get a list of the routes
let routeNames = routes.map((route) => route.path);

// Remove the '/posts/:id' route from the list of routes, as we add these manually
routeNames = routeNames.filter((route) => route !== "/posts/:id");

// Add the '/posts/:id' route for each post
postNames.forEach((post) => {
  routeNames.push(`/posts/${post}.md`);
});

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
    Sitemap({ hostname: "https://saattrupdan.com", dynamicRoutes: routeNames }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src/frontend", import.meta.url)),
    },
  },
});
