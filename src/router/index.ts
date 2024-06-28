import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes.ts";

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, _from, savedPosition) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        if (to.hash) {
          resolve({ el: to.hash, top: 100 });
        } else if (savedPosition) {
          resolve(savedPosition);
        } else {
          resolve({ top: 0 });
        }
      }, 50);
    });
  },
});

// This ensures that the page title is updated when the route changes, assuming that
// the page title has been set in the route's meta data.
router.beforeEach((to, _from, next) => {
  const id = to.params.id;
  if (id) {
    import(`@/posts/${id}.md`).then((module) => {
      const title = module.frontmatter["title"];
      const description = module.frontmatter["meta"];
      document.title = title;
      const querySelector = document.querySelector('meta[name="description"]');
      if (querySelector) querySelector.setAttribute("content", description);
    });
  } else {
    const title = to.meta.title as string;
    const description = to.meta.description as string;
    if (title) {
      document.title = title;
    }
    if (description) {
      const querySelector = document.querySelector('meta[name="description"]');
      if (querySelector) querySelector.setAttribute("content", description);
    }
  }
  next();
});

export default router;
