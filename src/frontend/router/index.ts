import type { Router } from "vue-router";

// Per-route document.title / meta description updates. vite-ssg bakes the
// initial values into the prerendered HTML; this hook keeps them in sync
// during client-side navigation. Phase 2 will replace it with per-view
// useHead() calls.
export function setupRouterHooks(router: Router, isClient: boolean) {
  if (!isClient) return;

  router.beforeEach((to, _from, next) => {
    const id = to.params.id;
    if (id) {
      import(`@/posts/${id}.md`).then((module) => {
        const title = module.frontmatter["title"];
        const description = module.frontmatter["meta"];
        if (title) document.title = title;
        const metaDescription = document.querySelector(
          'meta[name="description"]',
        );
        if (metaDescription && description) {
          metaDescription.setAttribute("content", description);
        }
      });
    } else {
      const title = to.meta.title as string | undefined;
      const description = to.meta.description as string | undefined;
      if (title) document.title = title;
      if (description) {
        const metaDescription = document.querySelector(
          'meta[name="description"]',
        );
        if (metaDescription) {
          metaDescription.setAttribute("content", description);
        }
      }
    }
    next();
  });
}
