# [saattrupdan.com](https://www.saattrupdan.com)

This is my personal website, built with [Vue](https://vuejs.org/) and
[Vite](https://vitejs.dev/).

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
├── package.json        <-- Dependencies
├── public              <-- Folder containing all images
├── src                 <-- Source folder
│   ├── App.vue         <-- Main view
│   ├── about.md        <-- The text used in the "About Me" view
│   ├── assets          <-- Some global CSS
│   ├── components      <-- All components used in my views
│   ├── directives.js   <-- Custom Vue directives
│   ├── main.js         <-- Javascript file attaching `App.vue` to `index.html`
│   ├── papers.yaml     <-- YAML file with my papers
│   ├── posts           <-- All blog posts in Markdown
│   ├── projects.yaml   <-- YAML file with my projects
│   ├── router.js       <-- The router used for navigation around the site
│   ├── stores          <-- All Pinia stores used for global state management
│   └── views           <-- All views on the site
├── vercel.json         <-- Configuration file used for deployment using `vercel`
└── vite.config.js      <-- Configuration file for Vite, including loading of plugins
```
