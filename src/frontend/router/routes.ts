export const routes = [
  {
    path: "/",
    name: "About",
    component: () => import("@/views/AboutView.vue"),
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
    path: "/sniff",
    name: "Sniff",
    component: () => import("@/views/SniffView.vue"),
    meta: {
      title: "Sniff — PTR-MS analysis software",
      description:
        "Free, open-source local desktop software for PTR-MS and PTR-TOF analysis of IONICON ioniTOF .h5 files, with reviewed peaks and intervals exported to CSV.",
      showMenus: true,
    },
  },
  {
    path: "/talks",
    name: "Talks",
    component: () => import("@/views/TalksView.vue"),
    meta: {
      title: "Dan's Talks, Podcasts and Webinars",
      description:
        "A collection of talks, podcasts and webinars that Dan Saattrup Smart has been a part of.",
      showMenus: true,
    },
  },
  {
    path: "/posts/:id",
    name: "Post",
    props: true,
    component: () => import("@/views/PostView.vue"),
    meta: {
      title: "Dan's Blog",
      description: "This is the blog of Dan Saattrup Smart.",
      showMenus: true,
    },
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/components/NotFound.vue"),
    meta: {
      title: "Page not found",
      description: "The page you are looking for does not exist.",
      showMenus: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "CatchAll",
    component: () => import("@/components/NotFound.vue"),
    meta: {
      title: "Page not found",
      description: "The page you are looking for does not exist.",
      showMenus: true,
    },
  },
];
