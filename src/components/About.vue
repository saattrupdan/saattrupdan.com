<script setup>
  import { ref } from 'vue'
  import Greeting from './Greeting.vue'
  import Description from '../about.md'
  const photoUrl = "/itu-photo-progressive.jpeg"
  const wrappedPhotoUrl = `url(${photoUrl})`
</script>

<template>
  <Greeting/>
  <div class="container">
    <div class="photo-box">
      <div class="photo-croppable"></div>
      <img class="photo" :src="photoUrl"/>
    </div>
    <div class="description-box">
      <div class="serif-text description">
        <Description/>
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
  }
  .photo {
    visibility: hidden;
    display: none;
  }
  .photo-croppable {
    height: 100%;
    background-image: v-bind("wrappedPhotoUrl");
    background-position: right;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .description-box {
    flex: 1 1 0px;
    background: rgb(228 224 224);
  }
  .description-box >>> * {
    background-color: transparent;
  }
  .description {
    margin: 5% 10% 10% 10%;
  }
  @media (max-width: 900px) {
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
