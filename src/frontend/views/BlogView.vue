<script lang="ts" setup>
import PostSnippet from "@/components/PostSnippet.vue";
import postNames from "@/posts/postNames.ts";
import { ref, onMounted, onUnmounted, type Ref } from "vue";

const PAGE_SIZE = 5;
const visibleCount = ref(Math.min(PAGE_SIZE, postNames.length));
const sentinel: Ref<HTMLDivElement | null> = ref(null);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && visibleCount.value < postNames.length) {
        visibleCount.value = Math.min(
          visibleCount.value + PAGE_SIZE,
          postNames.length,
        );
      }
    },
    { rootMargin: "200px" },
  );
  if (sentinel.value) observer.observe(sentinel.value);
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <h1 class="centered">Blog</h1>
  <div class="centered-box">
    <PostSnippet
      v-for="i in visibleCount"
      :id="postNames[i - 1]"
      :key="postNames[i - 1]"
    />
    <div ref="sentinel" aria-hidden="true"></div>
  </div>
</template>

<style scoped></style>
