<script lang="ts" setup>
import { ref } from "vue";
import TalkBox from "@/components/TalkBox.vue";
import talks from "@/talks.yaml";
import { useHead } from "@unhead/vue";

const title = "Talks, Podcasts & Webinars";
const description =
  "A collection of talks, podcasts, and webinars that Dan Saattrup Smart has been a part of, covering AI, machine learning, and applied research.";
useHead({
  title,
  meta: [
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ],
});

interface Talk {
  name: string;
  description: string;
  kind: string;
  url?: string;
  embed?: string;
  embedHeight?: number;
  embedRatio?: number;
}

const activeTalk = ref<Talk | null>(null);

function open(talk: Talk) {
  activeTalk.value = talk;
  document.body.style.overflow = "hidden";
}
function close() {
  activeTalk.value = null;
  document.body.style.overflow = "";
}
</script>

<template>
  <h1 class="centered">Talks, Podcasts &amp; Webinars</h1>
  <div class="container">
    <div v-for="talk in talks as Talk[]" :key="talk.name">
      <TalkBox
        :name="talk.name"
        :description="talk.description"
        :kind="talk.kind"
        :url="talk.url || ''"
        @open="open(talk)"
      />
    </div>
  </div>

  <div v-if="activeTalk" class="modal-backdrop" @click.self="close">
    <div class="modal">
      <button class="close" @click="close" aria-label="Close">&times;</button>
      <h2 class="centered">{{ activeTalk.name }}</h2>
      <div
        v-if="activeTalk.embedRatio"
        class="ratio-wrap"
        :style="{ paddingBottom: activeTalk.embedRatio + '%' }"
      >
        <iframe
          :src="activeTalk.embed"
          allow="autoplay *; fullscreen *; encrypted-media *; clipboard-write; picture-in-picture"
          allowfullscreen
          frameborder="0"
        ></iframe>
      </div>
      <iframe
        v-else
        :src="activeTalk.embed"
        :height="activeTalk.embedHeight || 152"
        width="100%"
        style="border-radius: 12px"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        frameborder="0"
      ></iframe>
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
.container > div {
  width: 380px;
  height: 340px;
  padding: 0 12px 24px 12px;
  box-sizing: border-box;
}
@media only screen and (max-width: 512px) {
  .container > div {
    width: 260px;
    height: 280px;
  }
}
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}
.modal {
  background: var(--bg-color, #fff);
  border-radius: 12px;
  padding: 24px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}
.close {
  position: absolute;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  font-size: 32px;
  line-height: 1;
  cursor: pointer;
  color: var(--text-color);
}
.ratio-wrap {
  position: relative;
  width: 100%;
  height: 0;
}
.ratio-wrap iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
}
</style>
