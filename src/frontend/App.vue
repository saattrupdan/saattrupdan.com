<script lang="ts" setup>
import Header from "@/components/TheHeader.vue";
import Footer from "@/components/TheFooter.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useHead } from "@unhead/vue";
import { SITE_NAME, SITE_URL, AUTHOR_NAME, absoluteUrl } from "@/seo/site";

const route = useRoute();
const viewKey = computed(() =>
  route.name === "Post" ? `post:${route.params.id}` : (route.name as string),
);

const canonicalUrl = computed(() => absoluteUrl(route.path));

useHead({
  titleTemplate: (title?: string) =>
    title && title !== SITE_NAME ? `${title} | ${SITE_NAME}` : SITE_NAME,
  meta: [
    { name: "author", content: AUTHOR_NAME },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonicalUrl },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  link: [
    { rel: "canonical", href: canonicalUrl },
    {
      rel: "alternate",
      type: "application/atom+xml",
      title: `${SITE_NAME} — Blog`,
      href: `${SITE_URL}/atom.xml`,
    },
  ],
});
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
