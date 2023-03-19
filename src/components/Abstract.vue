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
    <p class="abstract-button">
      <button @click="abstractVisible = !abstractVisible">
        {{ abstractVisible ? 'Hide abstract' : 'Show abstract' }}
      </button>
    </p>
    <blockquote v-if="abstractVisible" class="abstract">
      {{ abstract }}
    </blockquote>
  </div>
</template>

<style scoped>
  .abstract-block {
    margin-bottom: 40px;
    font-size: 16px;
  }
  .abstract-button {
    margin-top: 5px;
  }
  .abstract {
    margin-top: 5px;
  }
</style>
