import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'
import Blog from './components/Blog.vue'
import About from './components/About.vue'
import Post from './components/Post.vue'
import Papers from './components/Papers.vue'
import ProjectsAndDemos from './components/ProjectsAndDemos.vue'
import Scholarly from './components/Scholarly.vue'

import './assets/main.css'

// Create a new router instance.
const router = createRouter({
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
      name: 'ProjectsAndDemos',
      component: ProjectsAndDemos
    },
    {
      path: '/projects/scholarly',
      name: 'Scholarly',
      component: Scholarly
    }
  ]
})

// Create app with the router and navigation bar, and mount it
const app = createApp(App)
app.use(router)
app.mount('#app')
