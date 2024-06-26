export const routes = [
  {
    path: '/',
    name: 'About',
    component: () => import('@/views/About.vue'),
    alias: '/aboutme',
    meta: {
      title: 'Dan Saattrup Nielsen\'s Site',
      description: 'This is the website of Dan Saattrup Nielsen.',
    },
  },
  {
    path: '/posts',
    name: 'Blog',
    component: () => import('@/views/Blog.vue'),
    alias: '/index',
    meta: {
      title: 'Dan\'s Blog',
      description: 'This is the blog of Dan Saattrup Nielsen.',
    },
  },
  {
    path: '/papers',
    name: 'Papers',
    component: () => import('@/views/Papers.vue'),
    meta: {
      title: 'Dan\'s Research Papers',
      description: 'A list of all the research papers by Dan Saattrup Nielsen.',
    },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('@/views/Projects.vue'),
    meta: {
      title: 'Dan\'s Projects',
      description: 'A list of all the projects by Dan Saattrup Nielsen.',
    },
  },
  {
    path: '/podcasts',
    name: 'Podcasts',
    component: () => import('@/views/Podcasts.vue'),
    meta: {
      title: 'Podcasts and Webinars',
      description: 'A collection of all podcasts and webinars that Dan Saattrup Nielsen has been a part of.',
    },
  },
  {
    path: '/posts/:id',
    name: 'Post',
    props: true,
    component: () => import('@/views/Post.vue'),
    alias: '/:id',
    meta: {
      title: 'Dan\'s Blog',
      description: 'This is the blog of Dan Saattrup Nielsen.',
    },
  },
]
