<script setup>
  import Papers from '../papers.md'
  import { frontmatter } from '../papers.md'
  const papers = frontmatter.papers
</script>

<template>
  <h1 class="centered">Papers</h1>
  <div class="centered-box serif-text">
    <div v-for="paper in papers" :key="paper.url">
      <p class="title">{{ paper.year }} ⋅ <a :href="paper.url">{{ paper.title }}</a></p>
      <div v-for="author in paper.authors" :key="author">
        <span v-if="author == 'Dan Saattrup Nielsen'">
          <strong>{{ author }},</strong>
        </span>
        <span v-else>
          {{ author }},
        </span>
      </div>
      <p class="venue">{{ paper.venue }}</p>
      <blockquote>{{ paper.abstract }}</blockquote>
    </div>
  </div>
</template>

<style scoped>
  .title {
    font-size: 21px;
  }
  span {
    display: inline;
    white-space: nowrap;
  }
  .venue {
    font-size: 18px;
    font-style: italic;
  }
</style>
