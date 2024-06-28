<script lang="ts" setup>
const { name, description, url, imageName } = defineProps({
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  imageName: { type: String, required: true },
});
const imageUrl = new URL(`/src/assets/img/${imageName}`, import.meta.url).href;
</script>

<template>
  <div class="image-container">
    <a :href="url" class="project-link">
      <!-- Project image and placeholder -->
      <div class="image transition">
        <img :src="imageUrl" :alt="name" />
      </div>

      <!-- Image overlay -->
      <div class="overlay transition">
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
  opacity: 0.2;
}
.image-container:hover .overlay {
  opacity: 1;
}
.project-link {
  color: #3b3c36;
  text-decoration: none;
}
.image {
  width: 100%;
  height: 100%;
  display: block;
  background-color: #d9d6d6;
  filter: brightness(var(--image-brightness));
}
.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
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
@media only screen and (max-width: 512px) {
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
