<script setup>
  import { ref } from 'vue'
  const abstractVisible = ref(false)

  // Get props from parent component
  const { abstract } = defineProps({
    abstract: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <div class="abstract-block">
    <button @click="abstractVisible = !abstractVisible" class="abstract-button">
      {{ abstractVisible ? 'Hide abstract' : 'Show abstract' }}
    </button>
    <blockquote v-if="abstractVisible" class="abstract">{{ abstract }}</blockquote>
  </div>
</template>

<style scoped>
  .abstract-block {
    margin-bottom: 40px;
    font-size: 16px;
  }
  .abstract {
    margin-top: 10px;
  }
  .abstract-button {
    background-color: #fff;
    border: 1px solid #d5d9d9;
    border-radius: 8px;
    box-shadow: rgba(213, 217, 217, .5) 0 2px 5px 0;
    font-size: 13px;
    line-height: 26px;
    padding: 0 10px 0 11px;
    width: 110px;
    transition: 0.3s;
    cursor: pointer;
  }
  .abstract-button:hover {
    background-color: #f7fafa;
  }
</style>
