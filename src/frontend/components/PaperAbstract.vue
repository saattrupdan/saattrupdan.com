<script lang="ts" setup>
import { ref } from "vue";
const abstractVisible = ref(false);
const { abstract } = defineProps({
  abstract: { type: String, required: true },
});
</script>

<template>
  <div class="abstract-block">
    <button
      type="button"
      :aria-expanded="abstractVisible"
      @click="abstractVisible = !abstractVisible"
      class="abstract-button sans-serif-text"
    >
      <span>{{ abstractVisible ? "Hide abstract" : "Show abstract" }}</span>
      <span class="abstract-chevron" aria-hidden="true"></span>
    </button>
    <blockquote v-if="abstractVisible" class="abstract">
      {{ abstract }}
    </blockquote>
  </div>
</template>

<style scoped>
.abstract-block {
  margin-bottom: 40px;
  font-size: 16px;
}
.abstract {
  margin-top: 10px;
}
.abstract-button {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 36px;
  padding: 7px 13px;
  color: var(--text-color);
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 7px;
  box-shadow: 0 1px 2px color-mix(in srgb, var(--shadow-color) 8%, transparent);
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  transition:
    background-color 150ms ease,
    border-color 150ms ease;
}
.abstract-button:hover {
  background-color: var(--bg-table);
  border-color: var(--muted-color);
}
.abstract-button:focus-visible {
  outline: 2px solid var(--text-color);
  outline-offset: 3px;
}
.abstract-button:active {
  box-shadow: none;
}
.abstract-chevron {
  width: 6px;
  height: 6px;
  margin-top: -3px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: rotate(45deg);
  transition: transform 150ms ease;
}
.abstract-button[aria-expanded="true"] .abstract-chevron {
  transform: translateY(3px) rotate(225deg);
}
@media (prefers-reduced-motion: reduce) {
  .abstract-button,
  .abstract-chevron {
    transition: none;
  }
}
</style>
