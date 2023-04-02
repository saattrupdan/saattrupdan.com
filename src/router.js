import { createRouter, createWebHistory } from 'vue-router'
import Blog from './components/Blog.vue'
import About from './components/About.vue'
import Post from './components/Post.vue'
import Papers from './components/Papers.vue'
import Projects from './components/Projects.vue'
import Scholarly from './components/Scholarly.vue'
import Podcasts from './components/Podcasts.vue'
import Press from './components/Press.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/posts',
      name: 'Blog',
      component: Blog,
      alias: '/index',
      meta: {
        title: 'Dan\'s Blog',
        description: 'This is the blog of Dan Saattrup Nielsen.',
      },
    },
    {
      path: '/',
      name: 'About',
      component: About,
      alias: '/aboutme',
      meta: {
        title: 'Dan Saattrup Nielsen\'s Site',
        description: 'This is the website of Dan Saattrup Nielsen.',
      },
    },
    {
      path: '/papers',
      name: 'Papers',
      component: Papers,
      meta: {
        title: 'Dan\'s Research Papers',
        description: 'A list of all the research papers by Dan Saattrup Nielsen.',
      },
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
      meta: {
        title: 'Dan\'s Projects',
        description: 'A list of all the projects by Dan Saattrup Nielsen.',
      },
    },
    {
      path: '/scholarly',
      name: 'Scholarly',
      component: Scholarly,
      meta: {
        title: 'Scholarly Demo',
        description: 'A demo of the Scholarly project, predicting ArXiv categories of scientific papers using the title and abstract.',
      },
    },
    {
      path: '/podcasts',
      name: 'Podcasts',
      component: Podcasts,
      meta: {
        title: 'Podcasts and Webinars',
        description: 'A collection of all podcasts and webinars that Dan Saattrup Nielsen has been a part of.',
      },
    },
    {
      path: '/press',
      name: 'Press',
      component: Press,
      meta: {
        title: 'Press',
        description: 'A list of all the press that Dan Saattrup Nielsen has been a part of.',
      },
    },
    {
      path: '/posts/:id',
      name: 'Post',
      props: true,
      component: Post,
      alias: '/:id',
      meta: {
        title: 'Dan\'s Blog',
        description: 'This is the blog of Dan Saattrup Nielsen.',
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 };
    }
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

export { router }
