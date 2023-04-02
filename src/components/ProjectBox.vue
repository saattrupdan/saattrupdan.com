<script setup>
  const { name, description, url, imageUrl } = defineProps({
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

      <!-- Project image and placeholder -->
      <div class="image">
      </div>

      <!-- Image overlay -->
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
  .project-link {
    color: #3b3c36;
    text-decoration: none;
  }
  .image-container:hover .image {
    opacity: 0.2;
  }
  .image-container:hover .overlay {
    opacity: 1;
  }
  .image {
    width: 100%;
    height: 100%;
    display: block;
    transition: 0.3s;
    background-color: #d9d6d6;
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
  @media (max-width: 511px) {
    .overlay {
      opacity: 1;
    }
    .image-container .image {
      opacity: 0.2;
    }
    .overlay-title {
      font-size: 40px;
    }
  }
</style>
