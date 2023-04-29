<script setup>
  import PostSnippet from '@/components/PostSnippet.vue'
  import { ref, onMounted, onUnmounted } from 'vue'

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

  // Define an integer array of the post indices that we have displayed so far.
  // We initialise it to the first 5 posts.
  const displayedPostIndices = ref([...Array(5).keys()])

  // To handle infinite scrolling, we set up a `scrollComponent` variable which is
  // connected to the `div` element that contains the posts
  const scrollComponent = ref(null)

  // We define a function which loads the next 5 posts when we have scrolled to the
  // bottom of the page
  const handleScroll = (e) => {

    // Check if we have scrolled to the bottom of the page
    if (scrollComponent.value.getBoundingClientRect().bottom < window.innerHeight) {

      // Get the maximum index of the posts that we have displayed so far
      let maxIndex = Math.max(...displayedPostIndices.value)

      // Define a new array of the next 5 post indices to display. If there aren't 5
      // posts left to display, we just display the remaining posts.
      let newIndices = [
        ...Array(Math.min(5, postNames.length - displayedPostIndices.value.length))
        .keys()
      ].map((x) => x + maxIndex + 1)

      // Add the new indices to the list of displayed indices, which will dynamically
      // update the posts that are displayed
      displayedPostIndices.value.push(...newIndices)
    }
  }

  // We add an event listener to the `scrollComponent` variable when the component is
  // mounted
  onMounted(() => {
    window.addEventListener("scroll", handleScroll)
  })

  // We remove the event listener when the component is unmounted
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll)
  })
</script>

<template>
  <h1 class="centered">Blog</h1>
  <div ref="scrollComponent" class="centered-box">
    <PostSnippet v-for="i in displayedPostIndices" :id="postNames[i]"/>
  </div>
</template>

<style scoped>
</style>
