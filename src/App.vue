<script lang="ts" setup>
import Header from "@/components/TheHeader.vue";
import Footer from "@/components/TheFooter.vue";
</script>

<template>
  <Header v-show="$route.meta.showMenus" />
  <div class="main-view">
    <router-view :key="$route.fullPath" />
  </div>
  <Footer v-show="$route.meta.showMenus" />
</template>

<style scoped>
.main-view {
  margin-top: 100px;
  margin-bottom: 150px;
}
</style>
