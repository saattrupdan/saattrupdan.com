# SEO & AI Search Optimization Plan

Tracking checklist for the multi-phase SEO/AIO overhaul. Each phase ships as its own PR off `seo/vite-ssg-prerender` (or sibling branches).

---

## Phase 1 — Prerendering with vite-ssg

- [x] Install `vite-ssg`
- [x] Switch `main.ts` to `ViteSSG(App, { routes }, setup)` entry
- [x] Update `package.json` build script to `vite-ssg build`
- [x] Refactor `router/index.ts` — expose `setupRouterHooks(router, isClient)` instead of an own router instance
- [x] Refactor `PostView.vue` — replace `document.getElementsByClassName` title injection with reactive state, gate `hljs` + MathJax behind `typeof window !== "undefined"`
- [x] Refactor `PostSnippet.vue` — synchronous frontmatter via `import.meta.glob({ eager: true })`
- [x] Guard `DarkModeButton.vue` — move `document.documentElement` / `window.matchMedia` into `onMounted`
- [x] Drop blanket Vercel SPA rewrite so prerendered files are actually served
- [x] Verify prerendered HTML contains real title, `<h1>`, and rendered body

## Phase 2 — Head metadata per route

- [x] Global head defaults in `App.vue` via `useHead` (author, default OG, canonical, atom alternate)
- [x] Per-view `useHead` calls (`AboutView`, `BlogView`, `PapersView`, `ProjectsView`, `TalksView`, `PostView`)
- [x] JSON-LD: `Person` schema on `/`
- [x] JSON-LD: `BlogPosting` on each post
- [x] JSON-LD: `ScholarlyArticle` array on `/papers`
- [x] OG / Twitter Card tags per page
- [x] Remove redundant client-side title/meta mutation in router

## Phase 3 — URL hygiene

- [x] Remove `alias: "/:id"` from `/posts/:id` route
- [x] Drop `/aboutme`, `/index`, `/podcasts` aliases and replace with 301 redirects in `vercel.json`
- [x] Add catch-all `/:pathMatch(.*)*` → `NotFound` route
- [x] Prerender `/404` route and emit `dist/404.html` so Vercel returns real 404 status

## Phase 4 — Sitemap & feeds

- [x] Per-route sitemap metadata (`lastmod` from post frontmatter date, tiered `priority`, drop blanket `changefreq`)
- [x] Regenerate Atom feed `<updated>` at build time
- [x] Auto-generate `atom.xml` from post frontmatter on build (no longer a static `public/` file)
- [x] Replace `vite-plugin-sitemap` with a custom feeds plugin so per-route metadata is possible

## Phase 5 — Crawler signals

- [x] Update `robots.txt` with explicit `Allow` for GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended
- [x] Add `public/llms.txt` (bio + links to posts, papers, projects, ORCID/Scholar)

## Phase 6 — Content semantics

- [x] Change `PostView.vue` post title from `<h2>` to `<h1>`
- [x] Audit other views to ensure exactly one `<h1>` each
- [x] Add `alt` attribute to author photo in `AboutView.vue`
- [x] Audit remaining images for `alt` text
- [x] Title pattern: `"<page title> | Dan Saattrup Smart"` (except `/`)

## Phase 7 — Performance

- [x] Move MathJax script injection into `PostView.vue` (only loads on post pages)
- [x] Convert `highlight.js` language registrations to dynamic `import()` on demand
- [x] Add `<link rel="preconnect" href="https://cdn.jsdelivr.net">` (or self-host MathJax)
- [ ] Auto-generate per-post OG images at build (satori + post title) — deferred (requires new deps)

## Phase 8 — Verification

- [ ] Curl-test a sampling of routes; confirm title/meta/H1/body present without JS
- [ ] Lighthouse SEO + Best Practices on `/`, `/posts`, a post page, `/papers`
- [ ] Validate sitemap.xml and atom.xml with online validators
- [ ] Submit updated sitemap to Google Search Console + Bing Webmaster Tools
