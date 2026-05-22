<script lang="ts" setup>
import Abstract from "@/components/PaperAbstract.vue";
import papers from "@/papers.yaml";
import { useHead } from "@unhead/vue";
import { AUTHOR_NAME } from "@/seo/site";

interface Paper {
  title: string;
  url: string;
  authors: string[];
  venue: string;
  abstract?: string;
}

const years = Object.keys(papers).reverse();

const title = "Papers";
const description =
  "Peer-reviewed research papers by Dan Saattrup Smart on natural language processing, large language model evaluation, and applied machine learning.";

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Research papers by ${AUTHOR_NAME}`,
  itemListElement: years.flatMap((year) =>
    ((papers as Record<string, Paper[]>)[year] ?? []).map(
      (paper: Paper, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "ScholarlyArticle",
          headline: paper.title.trim(),
          name: paper.title.trim(),
          url: paper.url,
          datePublished: year,
          author: paper.authors.map((name) => ({
            "@type": "Person",
            name,
          })),
          publisher: paper.venue,
          abstract: paper.abstract?.trim(),
        },
      }),
    ),
  ),
};

useHead({
  title,
  meta: [
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(itemList),
    },
  ],
});
</script>

<template>
  <h1 class="centered">Papers</h1>
  <div class="centered-box serif-text">
    <!-- Iterate over the years where there are papers -->
    <div v-for="year in years" :key="year">
      <!-- Set year heading -->
      <h3 class="year">{{ year }}</h3>

      <!-- Iterate over the papers in the year -->
      <div v-for="paper in papers[year]" :key="paper.url">
        <!-- Set paper title -->
        <p class="title">
          <a :href="paper.url">{{ paper.title }}</a>
        </p>

        <!-- Iterate over the paper authors and highlight me -->
        <span v-for="author in paper.authors" :key="author">
          <span v-if="author == 'Dan Saattrup Smart'">
            <strong>{{ author }}</strong>
          </span>
          <span v-else>
            {{ author }}
          </span>
          <span v-if="author != paper.authors[paper.authors.length - 1]"
            >,
          </span>
        </span>

        <!-- Set paper venue -->
        <span class="venue">⋅ {{ paper.venue }}</span>

        <!-- Set paper abstract-->
        <Abstract :abstract="paper.abstract" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.year {
  margin-bottom: 0;
}
.title {
  font-size: 19px;
  margin-bottom: 0px;
}
.venue {
  font-size: 17px;
  font-style: italic;
}
</style>
