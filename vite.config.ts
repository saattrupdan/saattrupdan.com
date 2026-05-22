import { fileURLToPath, URL } from "node:url";
import { existsSync, readdirSync, writeFileSync } from "node:fs";
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

const sitemapStaticRoutes = routes
  .map((route) => route.path)
  .filter((route) => !route.includes(":") && route !== "/404");
const dynamicRoutes = [
  ...sitemapStaticRoutes,
  ...postNames.map((name) => `/posts/${name}`),
];

// Dev-only: mirror Vercel's behaviour for /talks/<slug> in vercel.json.
//   /talks/<slug>   -> 308 redirect to /talks/<slug>/
//   /talks/<slug>/  -> serve public/talks/<slug>/index.html
// Without this, Vite would fall through to the SPA shell and render blank.
function staticTalksDevServer(): Plugin {
  return {
    name: "serve-talks-index",
    apply: "serve",
    configureServer(server) {
      const publicDir = resolve(
        fileURLToPath(new URL("./public", import.meta.url)),
      );
      server.middlewares.use((req, res, next) => {
        const [pathname, query] = (req.url ?? "").split("?");
        const match = pathname.match(/^\/talks\/([^/]+)(\/?)$/);
        if (!match) return next();
        const slug = match[1];
        const indexPath = resolve(publicDir, "talks", slug, "index.html");
        if (!existsSync(indexPath)) return next();
        if (match[2] === "") {
          const target = `/talks/${slug}/${query ? `?${query}` : ""}`;
          res.statusCode = 308;
          res.setHeader("Location", target);
          res.end();
          return;
        }
        req.url = `/talks/${slug}/index.html${query ? `?${query}` : ""}`;
        next();
      });
    },
  };
}

export default defineConfig({
  // @ts-expect-error -- ssgOptions is injected by vite-ssg, not core Vite types.
  ssgOptions: {
    script: "async",
    formatting: "minify",
    dirStyle: "nested",
    includedRoutes(paths: string[]) {
      const staticPaths = paths.filter((p) => !p.includes(":"));
      const postPaths = postNames.map((name) => `/posts/${name}`);
      return [...staticPaths, ...postPaths];
    },
    // Vercel serves /404.html (at output root) with status 404 for unknown
    // paths. Mirror the rendered /404 page to dist/404.html.
    onPageRendered(route: string, renderedHTML: string) {
      if (route === "/404") {
        writeFileSync(resolve(__dirname, "dist/404.html"), renderedHTML);
      }
      return renderedHTML;
    },
  },
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
