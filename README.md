# [saattrupdan.com](https://www.saattrupdan.com)

This is my personal website, built with [Vue](https://vuejs.org/) and
[Vite](https://vitejs.dev/).

See [this blog post](https://www.saattrupdan.com/posts/2023-04-03-crash-course-in-vue)
for a crash course in Vue.js, which follows roughly the same structure as this repo.

The overall structure of this repository is the following.

```
.
├── README.md
├── about.md            <-- Markdown content for the "About Me" view
├── index.html          <-- Basic HTML file containing the app and Piwik Pro Analytics
├── makefile            <-- Just a few handy shortcuts
├── package-lock.json   <-- Automatically generated from `package.json`
├── package.json        <-- Dependencies
├── papers.yaml         <-- YAML file with my papers
├── projects.yaml       <-- YAML file with my projects
├── public              <-- Folder containing all images
├── src                 <-- Main source folder
│   ├── App.vue         <-- Main view
│   ├── assets          <-- Some global CSS
│   ├── components      <-- All components used in my views
│   ├── main.js         <-- Javascript file attaching `App.vue` to `index.html`
│   ├── posts           <-- All blog posts in Markdown
│   ├── router.js       <-- The router used for navigation around the site
│   └── views           <-- All views on the site
├── vercel.json         <-- Configuration file used for deployment using `vercel`
└── vite.config.js      <-- Configuration file for Vite, including loading of plugins
```
