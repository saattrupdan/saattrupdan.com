<script setup>
  import Abstract from '@/components/Abstract.vue'
  import papers from '@/papers.yaml'

  // Store the list of years, from newest to oldest
  const years = Object.keys(papers).reverse()
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
        <p class="title"><a :href="paper.url">{{ paper.title }}</a></p>

        <!-- Iterate over the paper authors and highlight me -->
        <span v-for="author in paper.authors" :key="author">
          <span v-if="author == 'Dan Saattrup Nielsen'">
            <strong>{{ author }}</strong>
          </span>
          <span v-else>
            {{ author }}
          </span>
          <span v-if="author != paper.authors[paper.authors.length - 1]">, </span>
        </span>

        <!-- Set paper venue -->
        <span class="venue">⋅ {{ paper.venue }}</span>

        <!-- Set paper abstract-->
        <Abstract :abstract="paper.abstract"/>

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
