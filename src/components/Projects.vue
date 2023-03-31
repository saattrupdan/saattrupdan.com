<script setup>
  import ProjectBox from './ProjectBox.vue'
  import projects from '../../projects.yaml'
</script>

<template>
  <h1 class="centered">Projects</h1>
  <div class="container">
    <div class="item" v-for="project in projects" :key="project.name">
      <ProjectBox
        :name="project.name"
        :description="project.description"
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
    width: 80%;
  }
  .container div {
    width: 350px;
    padding: 0px 10px 10px 10px;
  }
  @media (max-width: 511px) {
  .container div {
      width: 250px;
    }
  }
</style>
