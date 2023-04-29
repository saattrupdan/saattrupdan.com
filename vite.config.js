import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import MarkdownItAnchor from 'markdown-it-anchor'
import pluginYaml from "vite-plugin-yaml2"
import Sitemap from 'vite-plugin-sitemap'
import { routes } from './src/js/routes.js'

// Get a list of the routes
let routeNames = routes.map(route => route.path)

// Remove the '/posts/:id' route from the list of routes, as we add these manually
routeNames = routeNames.filter(route => route !== '/posts/:id')

// Create a list of post names
let postNames = [
  "2016-10-05-genericity-iterations-i.md",
  "2016-10-19-genericity-iterations-ii.md",
  "2016-11-02-jonsson-cardinals.md",
  "2016-11-16-jonsson-cardinals-and-the-core-model",
  "2016-11-30-the-stationary-tower-i-generic-ultra",
  "2016-12-14-the-stationary-tower-ii.md",
  "2016-12-28-sigma2_1-absoluteness.md",
  "2017-01-11-an-overview-of-determinacy-axioms.md",
  "2017-01-25-determinacy-from-woodins-i.md",
  "2017-02-08-determinacy-from-woodins-ii.md",
  "2017-02-22-determinacy-from-woodins-iii.md",
  "2017-04-05-from-determinacy-to-a-woodin-i.md",
  "2017-05-10-from-determinacy-to-a-woodin-ii.md",
  "2017-05-24-the-structure-of-games.md",
  "2017-06-07-borel-determinacy.md",
  "2017-06-21-hod-models-of-determinacy.md",
  "2017-07-14-limitations-of-zfc-determinacy.md",
  "2017-07-28-jonsson-successors-of-singulars.md",
  "2017-12-18-projective-understanding-via-woodins",
  "2017-12-29-from-mice-to-determinacy.md",
  "2018-01-20-projectively-correct-mice.md",
  "2018-08-02-mice-and-long-games.md",
  "2019-05-15-poisson.md",
  "2019-05-22-uniform.md",
  "2019-05-28-geometric-exponential.md",
  "2019-06-05-normal.md",
  "2019-06-12-singular-value-decomposition.md",
  "2019-09-07-naturalselection.md",
  "2019-10-27-squared-error-and-cross-entropy.md",
  "2019-11-11-syllables.md",
  "2020-01-21-scholarly.md",
  "2020-02-20-confidence.md",
  "2020-02-26-parametric-prediction.md",
  "2020-03-01-bootstrap-prediction.md",
  "2020-03-09-quantile-regression.md",
  "2020-04-05-quantile-regression-forests.md",
  "2020-08-07-pagerank.md",
  "2020-08-24-deepwalk.md",
  "2021-04-04-doubt.md",
  "2021-05-30-graph-convolutional-neural-networks.",
  "2022-07-19-int.md",
  "2022-08-28-makefu.md",
  "2022-11-19-monitoring-with-uncertainty.md",
  "2023-04-03-crash-course-in-vue.md",
  "2023-04-16-open-source-chatgpt-alternatives.md",
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
    Markdown({
      markdownItSetup(md) {
        md.use(
          MarkdownItAnchor,
          {
            permalink: MarkdownItAnchor.permalink.ariaHidden({
              placement: 'before'
            }),
            slugify: function (s) {
              return encodeURIComponent(
                String(s)
                  .trim()
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^a-zA-Z0-9\-]+/g, '')
              )
            },
          }
        )
      },
    }),
    pluginYaml(),
    Sitemap({ hostname: 'https://saattrupdan.com', dynamicRoutes: routeNames }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
