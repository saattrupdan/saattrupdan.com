# [saattrupdan.com](https://www.saattrupdan.com)

This is my personal website, built with [Vue3](https://vuejs.org/),
[Vite4](https://vitejs.dev/), [VueRouter4](https://router.vuejs.org/) and
[Pinia2](https://pinia.vuejs.org/).

See [this blog post](https://www.saattrupdan.com/posts/2023-04-03-crash-course-in-vue)
for a crash course in Vue.js, which follows roughly the same structure as this repo.

The overall structure of this repository is the following.

```
.
├── public                  <-- Folder containing all PDFs
├── src
│   ├── assets              <-- Directory containing all CSS and images
│   ├── components          <-- Directory with all components used in views
│   ├── directives          <-- Directory with all custom Vue directives
│   ├── posts               <-- Directory with all blog posts as Markdown
│   ├── router              <-- Directory containing the `vue-router` setup
│   ├── stores              <-- Directory with all Pinia stores for global states
│   ├── views               <-- Directory with all the views
│   ├── about.md            <-- The text used in the "About" view
│   ├── App.vue             <-- Main view
│   ├── main.js             <-- Main JavaScript, which creates the Vue app and mounts it
│   ├── papers.yaml         <-- YAML with all my papers
│   └── projects.yaml       <-- YAML with all my projects
├── generate_post_names.py  <-- Python script that generates the names of the posts
├── index.html              <-- Basic HTML file containing the app and Piwik Pro Analytics
├── LICENSE                 <-- The license of the source code
├── makefile                <-- Just a few handy shortcuts
├── package-lock.json       <-- Automatically generated from `package.json`
├── package.json            <-- NPM dependencies
├── README.md               <-- This readme
├── vercel.json             <-- Configuration file used for deployment using `vercel`
└── vite.config.js          <-- Configuration file for Vite, including loading of plugins
```
