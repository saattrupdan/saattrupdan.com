<script setup>
  import PostSnippet from './PostSnippet.vue'
  import { ref } from 'vue'

  // Define list of filenames in the posts directory
  const postNames = Object.keys(import.meta.globEager('@/posts/*.md')).map(
    (file) => file.split('/').slice(-1)[0].slice(0, -3)
  )

  // Get the dates of the posts, being the beginning of the post name, of the form
  // YYYY-MM-DD
  let postDates = []
  for (let i = 0; i < postNames.length; i++) {
    let date = new Date(postNames[i].split('-').slice(0, 3).join('-'))
    postDates.push(date)
  }

  // Sort the dates
  postNames.sort((a, b) => {
    return postDates[postNames.indexOf(b)] - postDates[postNames.indexOf(a)]
  })
</script>

<template>
  <h1 class="centered">Blog</h1>
  <div v-for="postName in postNames" class="centered-box">
    <Suspense>
      <PostSnippet :id="postName"/>
    </Suspense>
  </div>
</template>

<style scoped>
  .top-margin {
    margin-top: 160px;
  }
</style>
