import { ViteSSG } from "vite-ssg";
import { createPinia } from "pinia";

import App from "@/App.vue";
import { routes } from "@/router/routes";
import { vClickOutside } from "@/directives";

import "./assets/main.css";

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, _from, savedPosition) {
      return new Promise((resolve) => {
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
  },
  ({ app }) => {
    app.use(createPinia());
    app.directive("click-outside", vClickOutside);
  },
);
