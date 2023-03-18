<script setup>
  import { ref } from 'vue'
  import { frontmatter } from '../papers.md'
  import Papers from '../papers.md'
  var storedYear = ref(0)

  function getYear(year) {
    storedYear.value = year
    return year
  }
</script>

<template>
  <h1 class="centered">Papers</h1>
  <div class="centered-box serif-text">
    <div v-for="paper in frontmatter.papers" :key="paper.url">

      <!-- Paper year if applicable -->
      <div v-if="paper.year != storedYear">
        <h3 class="year">{{ getYear(paper.year) }}</h3>
      </div>

      <!-- Paper title -->
      <p class="title"><a :href="paper.url">{{ paper.title }}</a></p>

      <!-- Paper authors -->
      <span v-for="author in paper.authors" :key="author">
        <span v-if="author == 'Dan Saattrup Nielsen'">
          <strong>{{ author }}</strong>
        </span>
        <span v-else>
          {{ author }}
        </span>
        <span v-if="author != paper.authors[paper.authors.length - 1]">, </span>
      </span>

      <!-- Paper venue -->
      <p class="venue">{{ paper.venue }}</p>

      <!-- Paper abstract-->
      <blockquote class="abstract">{{ paper.abstract }}</blockquote>

    </div>
  </div>
</template>

<style scoped>
  .year {
    margin-bottom: 0;
  }
  .title {
    font-size: 21px;
    margin-bottom: 0px;
  }
  .authors {
    font-size: 18px;
  }
  .venue {
    font-size: 18px;
    font-style: italic;
    margin-top: 0px;
  }
  .abstract {
    margin-top: -10px;
    margin-bottom: 40px;
    font-size: 16px;
  }
</style>
