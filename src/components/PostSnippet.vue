<script setup>
  import { ref } from 'vue'

  // Get props from parent component
  const { id } = defineProps({
    id: {
      type: String,
      required: true
    }
  })

  // Import title and subtitle
  const title = ref('')
  const subtitle = ref('')
  import(`@/posts/${id}.md`).then((module) => {
    title.value = module.frontmatter['title']
    subtitle.value = module.frontmatter['subtitle']
  })

  // Import date and convert it from YYYY-MM-DD to Month DD, YYYY
  let dateObj = new Date(id.split('-').slice(0, 3).join('-'))
  let month = dateObj.toLocaleString('default', { month: 'long' })
  let day = dateObj.getDate()
  let year = dateObj.getFullYear()
  const date = ref(`${month} ${day}, ${year}`)

  // Get description of post and set it to a reactive variable
  const description = ref('')
  import(`@/posts/${id}.md`).then((module) => {
    description.value = `${module.frontmatter['meta']} `
  })

  // Create url for post
  const url = `/posts/${id}`
</script>

<template>
  <router-link :to="url">
    <h3 class="post-title">{{ title }}{{ subtitle ? ": " : "" }}{{ subtitle }}</h3>
  </router-link>
  <p class="post-date serif-text">Posted on {{ date }}</p>
  <p class="post-description sans-serif-text">{{ description }}</p>
  <div class="separator"/>
</template>

<style scoped>
  h3 {
    margin-bottom: -10px;
  }
  p {
    display: inline-block;
  }
  .post-title:hover {
    color: #0085A1;
  }
  .post-date {
    margin-bottom: 20px;
    color: gray;
  }
  .post-description {
    margin-top: -10px;
  }
  .separator {
    margin-top: 10px;
    border-bottom: 0.1px solid gray;
  }
</style>
