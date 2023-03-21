<script setup>
  // Get props from parent component
  const { name, url, imageUrl } = defineProps({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
  })
</script>

<template>
  <div class="image-container">
    <a :href="url" class="project-link">
      <img class="image" :src="imageUrl" :alt="name"/>
      <div class="overlay">
        <div class="overlay-title sans-serif-text">{{ name }}</div>
        <div class="overlay-text sans-serif-text">{{ description }}</div>
      </div>
    </a>
  </div>
</template>

<style scoped>
  .image-container {
    flex: 1 1 0px;
    position: relative;
  }
  .image-container:hover .image {
    opacity: 0.3;
  }
  .image-container:hover .overlay {
    opacity: 1;
  }
  .overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: 0.3s;
    background-color: transparent;
  }
  .overlay-title {
    background-color: transparent;
    font-size: 60px;
    text-align: center;
  }
  .overlay-text {
    background-color: transparent;
    font-size: 18px;
    text-align: center;
  }
  .image {
    display: block;
    transition: 0.3s;
  }
  .project-link {
    color: #3b3c36;
    text-decoration: none;
  }
  @media (max-width: 900px) {
    .overlay-title {
      font-size: 40px;
    }
  }
</style>
