export const routes = [
  {
    path: "/",
    name: "About",
    component: () => import("@/views/AboutView.vue"),
    alias: "/aboutme",
    meta: {
      title: "Dan Saattrup Smart's Site",
      description: "This is the website of Dan Saattrup Smart.",
      showMenus: true,
    },
  },
  {
    path: "/posts",
    name: "Blog",
    component: () => import("@/views/BlogView.vue"),
    alias: "/index",
    meta: {
      title: "Dan's Blog",
      description: "This is the blog of Dan Saattrup Smart.",
      showMenus: true,
    },
  },
  {
    path: "/papers",
    name: "Papers",
    component: () => import("@/views/PapersView.vue"),
    meta: {
      title: "Dan's Research Papers",
      description: "A list of all the research papers by Dan Saattrup Smart.",
      showMenus: true,
    },
  },
  {
    path: "/projects",
    name: "Projects",
    component: () => import("@/views/ProjectsView.vue"),
    meta: {
      title: "Dan's Projects",
      description: "A list of all the projects by Dan Saattrup Smart.",
      showMenus: true,
    },
  },
  {
    path: "/podcasts",
    name: "Podcasts",
    component: () => import("@/views/PodcastsView.vue"),
    meta: {
      title: "Podcasts and Webinars",
      description:
        "A collection of all podcasts and webinars that Dan Saattrup Smart has been a part of.",
      showMenus: true,
    },
  },
  {
    path: "/posts/:id",
    name: "Post",
    props: true,
    component: () => import("@/views/PostView.vue"),
    alias: "/:id",
    meta: {
      title: "Dan's Blog",
      description: "This is the blog of Dan Saattrup Smart.",
      showMenus: true,
    },
  },
  {
    path: "/multiwikiqa-feedback",
    name: "MultiWikiQA Feedback",
    component: () => import("@/views/MultiWikiQAFeedbackView.vue"),
    alias: "/index",
    meta: {
      title: "MultiWikiQA Feedback",
      description: "Feedback for the MultiWikiQA dataset.",
      showMenus: false,
    },
  },
  {
    path: "/geomatic-demo",
    name: "Geomatic Demo",
    component: () => import("@/views/GeomaticDemoView.vue"),
    alias: "/index",
    meta: {
      title: "Geomatic Demo",
      description: "En demo af Geomatic chatbotten.",
      showMenus: false,
    },
  },
];
