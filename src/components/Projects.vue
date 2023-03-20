<script setup>
  import ProjectBox from './ProjectBox.vue'
  const projects = [
    {
      name: "Scholarly",
      url: "/posts/2020-01-21-scholarly",
      imageUrl: "/scholarly-progressive.jpeg",
      externalUrl: false,
    },
    {
      name: "AutoPoet",
      url: "/posts/2019-11-11-syllables",
      imageUrl: "/autopoet-progressive.jpeg",
      externalUrl: false,
    },
    {
      name: "Natural Selection",
      url: "/posts/2019-09-07-naturalselection",
      imageUrl: "/natural-selection-progressive.jpeg",
      externalUrl: false,
    },
    {
      name: "Athelstan",
      url: "https://github.com/saattrupdan/athelstan",
      imageUrl: "/athelstan-progressive.jpeg",
      externalUrl: true,
    },
  ]
</script>

<template>
  <h1 class="centered">Projects</h1>
  <div class="container">
    <div class="item" v-for="project in projects" :key="project.name">
      <ProjectBox
        :name="project.name"
        :url="project.url"
        :imageUrl="project.imageUrl"
        :externalUrl="project.externalUrl"
      />
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
    width: 70%;
  }
  .container div {
    width: 400px;
    padding: 0px 10px 10px 10px;
  }
  @media (max-width: 900px) {
  .container div {
      width: 250px;
    }
  }
</style>
