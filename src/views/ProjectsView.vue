<script lang="ts" setup>
import ProjectBox from "@/components/ProjectBox.vue";
import projects from "@/projects.yaml";
</script>

<template>
  <h1 class="centered">Projects</h1>
  <div class="container">
    <div v-for="project in projects" :key="project.name">
      <ProjectBox
        :name="project.name"
        :description="project.description"
        :url="project.url"
        :imageName="project.imageName"
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
  height: 350px;
  padding: 0px 10px 20px 10px;
}
@media only screen and (max-width: 512px) {
  .container div {
    width: 250px;
    height: 250px;
  }
}
</style>
