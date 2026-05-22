<script lang="ts" setup>
defineProps({
  name: { type: String, required: true },
  description: { type: String, required: true },
  kind: { type: String, required: true },
  url: { type: String, default: "" },
});
defineEmits<{ (e: "open"): void }>();

const kindLabel: Record<string, string> = {
  talk: "Talk",
  podcast: "Podcast",
  webinar: "Webinar",
};
</script>

<template>
  <component
    :is="url ? 'a' : 'button'"
    :href="url || undefined"
    :target="url ? '_blank' : undefined"
    :rel="url ? 'noopener noreferrer' : undefined"
    class="talk-box transition"
    :class="`kind-${kind}`"
    @click="!url && $emit('open')"
  >
    <svg
      v-if="kind === 'talk'"
      class="kind-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <line x1="8" y1="20" x2="16" y2="20" />
      <line x1="12" y1="16" x2="12" y2="20" />
    </svg>
    <svg
      v-else-if="kind === 'podcast'"
      class="kind-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <line x1="12" y1="18" x2="12" y2="21" />
      <line x1="9" y1="21" x2="15" y2="21" />
    </svg>
    <svg
      v-else-if="kind === 'webinar'"
      class="kind-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="5" width="14" height="10" rx="1.5" />
      <polygon points="16.5,8 21.5,5.5 21.5,14.5 16.5,12" />
      <line x1="6" y1="19" x2="13" y2="19" />
    </svg>
    <div class="kind-badge sans-serif-text">{{ kindLabel[kind] || kind }}</div>
    <div class="title sans-serif-text">{{ name }}</div>
    <div class="description sans-serif-text">{{ description }}</div>
  </component>
</template>

<style scoped>
.talk-box {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  background: var(--bg-secondary, #f5f3ef);
  color: var(--text-color, #3b3c36);
  text-decoration: none;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.08);
  font: inherit;
}
.talk-box:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  color: #0085a1;
}
.kind-icon {
  width: 72px;
  height: 72px;
  margin-bottom: 16px;
  color: #0085a1;
}
.kind-talk .kind-icon {
  color: #0085a1;
}
.kind-podcast .kind-icon {
  color: #1db954;
}
.kind-webinar .kind-icon {
  color: #b85c00;
}
.kind-badge {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.7;
  margin-bottom: 6px;
}
.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 1.25;
}
.description {
  font-size: 16px;
  opacity: 0.8;
  line-height: 1.4;
}
</style>
