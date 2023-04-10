# [saattrupdan.com](https://www.saattrupdan.com)

This is my personal website, built with [Vue3](https://vuejs.org/),
[Vite4](https://vitejs.dev/), [VueRouter4](https://router.vuejs.org/) and
[Pinia2](https://pinia.vuejs.org/).

See [this blog post](https://www.saattrupdan.com/posts/2023-04-03-crash-course-in-vue)
for a crash course in Vue.js, which follows roughly the same structure as this repo.

The overall structure of this repository is the following.

```
.
├── LICENSE             <-- The license of the source code
├── README.md           <-- This readme
├── index.html          <-- Basic HTML file containing the app and Piwik Pro Analytics
├── makefile            <-- Just a few handy shortcuts
├── package-lock.json   <-- Automatically generated from `package.json`
├── package.json        <-- NPM dependencies
├── public              <-- Folder containing all images and PDFs
├── src
│   ├── App.vue         <-- Main view
│   ├── about.md        <-- The text used in the "About" view
│   ├── components      <-- Directory with all components used in views
│   ├── css             <-- Directory with all global CSS
│   ├── js              <-- Directory with javascript setting up the Vue app
│   ├── papers.yaml     <-- YAML with all my papers
│   ├── posts           <-- Directory containing all Markdown blog posts
│   ├── projects.yaml   <-- YAML with all my projects
│   ├── stores          <-- Directory with all Pinia stores for global states
│   └── views           <-- Directory with all the views
├── vercel.json         <-- Configuration file used for deployment using `vercel`
└── vite.config.js      <-- Configuration file for Vite, including loading of plugins
