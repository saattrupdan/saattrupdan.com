import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes.js'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (to.hash) {
          resolve({ el: to.hash, top: 100 })
        } else if (savedPosition) {
          resolve(savedPosition)
        } else {
          resolve({ top: 0 })
        }
      }, 50)
    })
  },
})

// This ensures that the page title is updated when the route changes, assuming that
// the page title has been set in the route's meta data.
router.beforeEach((to, from, next) => {
  const id = to.params.id
  if (id) {
    import(`@/posts/${id}.md`).then((module) => {
      const title = module.frontmatter['title']
      const description = module.frontmatter['meta']
      document.title = title
      document.querySelector('meta[name="description"]').setAttribute('content', description)
    })
  }
  else {
    const title = to.meta.title
    const description = to.meta.description
    if (title) {
      document.title = title
    }
    if (description) {
      document.querySelector('meta[name="description"]').setAttribute('content', description)
    }
  }
  next()
})

export default router
