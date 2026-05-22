<script lang="ts" setup>
import { computed } from "vue";
import { postMeta } from "@/posts/postMeta";

const { id } = defineProps({
  id: { type: String, required: true },
});

const post = computed(() => postMeta[id]);
const url = computed(() => `/posts/${id}`);
</script>

<template>
  <template v-if="post">
    <router-link :to="url">
      <h3 class="post-title">
        {{ post.title }}{{ post.subtitle ? ": " : "" }}{{ post.subtitle }}
      </h3>
    </router-link>
    <p class="post-date serif-text">Posted on {{ post.date }}</p>
    <p class="post-description sans-serif-text">{{ post.description }}</p>
    <div class="separator" />
  </template>
</template>

<style scoped>
h3 {
  margin-bottom: -10px;
}
p {
  display: inline-block;
}
.post-title:hover {
  color: #0085a1;
}
.post-date {
  margin-bottom: 20px;
  color: gray;
}
.post-description {
  margin-top: -10px;
}
.separator {
  margin-top: 10px;
  border-bottom: 0.1px solid gray;
}
</style>
