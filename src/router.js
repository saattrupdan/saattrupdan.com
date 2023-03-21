import { createRouter, createWebHashHistory } from 'vue-router'
import Blog from './components/Blog.vue'
import About from './components/About.vue'
import Post from './components/Post.vue'
import Papers from './components/Papers.vue'
import Projects from './components/Projects.vue'
import Scholarly from './components/Scholarly.vue'
import Podcasts from './components/Podcasts.vue'
import Press from './components/Press.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/posts',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/',
      name: 'About',
      component: About
    },
    {
      path: '/posts/:id',
      name: 'Post',
      props: true,
      component: Post
    },
    {
      path: '/papers',
      name: 'Papers',
      component: Papers
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/scholarly',
      name: 'Scholarly',
      component: Scholarly
    },
    {
      path: '/podcasts',
      name: 'Podcasts',
      component: Podcasts
    },
    {
      path: '/press',
      name: 'Press',
      component: Press
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0, behavior: "smooth" };
  }
})
