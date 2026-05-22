<script lang="ts" setup>
import Header from "@/components/TheHeader.vue";
import Footer from "@/components/TheFooter.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
// Only force a remount when switching between individual blog posts (same
// route component, different `id`). Other navigations reuse components.
const viewKey = computed(() =>
  route.name === "Post" ? `post:${route.params.id}` : (route.name as string),
);
</script>

<template>
  <Header v-show="$route.meta.showMenus" />
  <div class="main-view">
    <router-view :key="viewKey" />
  </div>
  <Footer v-show="$route.meta.showMenus" />
</template>

<style scoped>
.main-view {
  margin-top: 100px;
  margin-bottom: 150px;
}
</style>
