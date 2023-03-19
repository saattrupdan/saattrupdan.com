<script setup>
  import { defineAsyncComponent, onMounted, ref, nextTick } from 'vue'

  // Get props from parent component
  const { id } = defineProps({
    id: {
      type: String,
      required: true
    }
  })

  // Import post content as a component
  const PostContent = defineAsyncComponent(() => import(`../posts/${id}.md`))

  // Update Mathjax when the post content is updated. It seems like we need to update
  // it twice, both when "onMounted" and "nextTick" are triggered. Leaving out one of
  // them causes it not to work ¯\_(ツ)_/¯
  onMounted(() => {
    window.MathJax.Hub.Queue(
      ['Typeset', window.MathJax.Hub, () => {console.log('MathJax typeset on mount')}]
    )
  })
  nextTick(() => {
    window.MathJax.Hub.Queue(
      ['Typeset', window.MathJax.Hub, () => {console.log('MathJax typeset on tick')}]
    )
  })

  // Import title and display it
  import(`@/posts/${id}.md`).then((module) => {
    let title = module.frontmatter['title']
    let title_tags = document.getElementsByClassName('title')
    for (let i = 0; i < title_tags.length; i++) {
      title_tags[i].innerHTML = title
    }
  })

  // Import date, convert it from "YYYY-MM-DD" to "Month DD, YYYY", and display it
  let dateObj = new Date(id.split('-').slice(0, 3).join('-'))
  let month = dateObj.toLocaleString('default', { month: 'long' })
  let day = dateObj.getDate()
  let year = dateObj.getFullYear()
  const date = ref(`${month} ${day}, ${year}`)
</script>

<template>
  <div class="centered-box">
    <h2 class="title"></h2>
    <p class="post-date serif-text">Posted on {{ date }}</p>
    <div class="serif-text">
      <PostContent/>
    </div>
  </div>
</template>

<style scoped>
  h2 {
    margin-bottom: -10px;
  }
  p {
    display: inline-block;
  }
  .post-date {
    margin-bottom: 20px;
    color: gray;
    font-style: italic;
  }
  .content {
  }
</style>
