import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import pluginYaml from "vite-plugin-yaml2"
import Sitemap from 'vite-plugin-sitemap'
import { routes } from './src/js/routes.js'

// Get a list of the routes
let routeNames = routes.map(route => route.path)

// Remove the '/posts/:id' route from the list of routes, as we add these manually
routeNames = routeNames.filter(route => route !== '/posts/:id')

// Create a list of post names
let postNames = [
  '2019-05-15-poisson',
  '2019-05-22-uniform',
  '2019-05-28-geometric-exponential',
  '2019-06-05-normal',
  '2019-06-12-singular-value-decomposition',
  '2019-09-07-naturalselection',
  '2019-10-27-squared-error-and-cross-entropy',
  '2019-11-11-syllables',
  '2020-01-21-scholarly',
  '2020-02-20-confidence',
  '2020-02-26-parametric-prediction',
  '2020-03-01-bootstrap-prediction',
  '2020-03-09-quantile-regression',
  '2020-04-05-quantile-regression-forests',
  '2020-08-07-pagerank',
  '2020-08-24-deepwalk',
  '2021-04-04-doubt',
  '2021-05-30-graph-convolutional-neural-networks',
  '2022-07-19-int',
  '2022-08-28-makefu',
  '2022-11-19-monitoring-with-uncertainty',
  '2023-04-03-crash-course-in-vue',
  '2023-04-16-open-source-chatgpt-alternatives',
]

// Add the '/posts/:id' route for each post
postNames.forEach(post => {
  routeNames.push(`/posts/${post}`)
})

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown(),
    pluginYaml(),
    Sitemap({ hostname: 'https://saattrupdan.com', dynamicRoutes: routeNames }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
