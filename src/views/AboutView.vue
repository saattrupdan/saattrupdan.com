<script lang="ts" setup>
import Greeting from "@/components/TheGreeting.vue";
import Description from "@/about.md";
import photoUrl from "@/assets/img/itu-photo.webp";
const wrappedPhotoUrl = `url(${photoUrl})`;
</script>

<template>
  <Greeting />
  <div class="container">
    <div class="photo-box">
      <div class="photo-croppable"></div>
      <img class="photo" :src="photoUrl" />
    </div>
    <div class="description-box">
      <div class="serif-text description">
        <Description />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
.photo-box {
  flex: 1 1 0px;
  filter: brightness(var(--image-brightness));
}
.photo-croppable {
  height: 100%;
  background-image: v-bind("wrappedPhotoUrl");
  background-position: right;
  background-repeat: no-repeat;
  background-size: cover;
}
.photo {
  visibility: hidden;
  display: none;
}
.description-box {
  flex: 1 1 0px;
  background: var(--bg-box);
}
:deep(.description-box *) {
  background-color: transparent;
}
.description {
  margin: 5% 10% 10% 10%;
}
@media (max-width: 750px) {
  .container {
    flex-wrap: wrap;
  }
  .photo-box {
    flex-basis: 100%;
  }
  .photo {
    display: block;
  }
}
</style>
