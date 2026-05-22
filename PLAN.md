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

- [ ] Global head defaults in `App.vue` via `useHead` (author, default OG, canonical, atom alternate)
- [ ] Per-view `useHead` calls (`AboutView`, `BlogView`, `PapersView`, `ProjectsView`, `TalksView`, `PostView`)
- [ ] JSON-LD: `Person` schema on `/`
- [ ] JSON-LD: `BlogPosting` on each post
- [ ] JSON-LD: `ScholarlyArticle` array on `/papers`
- [ ] OG / Twitter Card tags per page

## Phase 3 — URL hygiene

- [ ] Remove `alias: "/:id"` from `/posts/:id` route
- [ ] Decide on `/aboutme`, `/index`, `/podcasts` aliases (drop or 301 redirect via `vercel.json`)
- [ ] Add catch-all `/:pathMatch(.*)*` → `NotFound` route
- [ ] Configure Vercel to serve real 404 status for unknown paths (replace blanket `/:path*` rewrite)

## Phase 4 — Sitemap & feeds

- [ ] Per-route sitemap metadata (`lastmod` from post frontmatter date, tiered `priority`, drop blanket `changefreq`)
- [ ] Regenerate Atom feed `<updated>` at build time
- [ ] Auto-generate `public/atom.xml` from post frontmatter on build

## Phase 5 — Crawler signals

- [ ] Update `robots.txt` with explicit `Allow` for GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended
- [ ] Add `public/llms.txt` (bio + links to posts, papers, projects, ORCID/Scholar)

## Phase 6 — Content semantics

- [ ] Change `PostView.vue` post title from `<h2>` to `<h1>`
- [ ] Audit other views to ensure exactly one `<h1>` each
- [ ] Add `alt` attribute to author photo in `AboutView.vue`
- [ ] Audit remaining images for `alt` text
- [ ] Title pattern: `"<page title> | Dan Saattrup Smart"` (except `/`)

## Phase 7 — Performance

- [ ] Move MathJax script injection into `PostView.vue` (only loads on post pages)
- [ ] Convert `highlight.js` language registrations to dynamic `import()` on demand
- [ ] Add `<link rel="preconnect" href="https://cdn.jsdelivr.net">` (or self-host MathJax)
- [ ] Optional: auto-generate per-post OG images at build (satori + post title)

## Phase 8 — Verification

- [ ] Curl-test a sampling of routes; confirm title/meta/H1/body present without JS
- [ ] Lighthouse SEO + Best Practices on `/`, `/posts`, a post page, `/papers`
- [ ] Validate sitemap.xml and atom.xml with online validators
- [ ] Submit updated sitemap to Google Search Console + Bing Webmaster Tools
