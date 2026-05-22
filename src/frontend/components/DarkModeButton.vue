<script lang="ts" setup>
import { onMounted, ref, type Ref } from "vue";

import cssVariables from "@/assets/css-variables.yaml";

const darkmode: Ref<boolean | null> = ref(null);

function enableDarkMode() {
  darkmode.value = true;
  const root = document.documentElement;
  const darkmodeVariables: [string, string][] = Object.entries(
    cssVariables.darkmode,
  );
  for (let [key, value] of darkmodeVariables) {
    root.style.setProperty(`--${key}`, value);
  }
}

function disableDarkMode() {
  darkmode.value = false;
  const root = document.documentElement;
  const lightmodeVariables: [string, string][] = Object.entries(
    cssVariables.lightmode,
  );
  for (let [key, value] of lightmodeVariables) {
    root.style.setProperty(`--${key}`, value);
  }
}

onMounted(() => {
  if (window.matchMedia?.("(prefers-color-scheme:dark)")?.matches) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
</script>

<template>
  <div class="container">
    <input
      @change="darkmode ? disableDarkMode() : enableDarkMode()"
      id="checkbox"
      type="checkbox"
      class="checkbox"
    />
    <label for="checkbox" class="label transition">
      <span class="icon">🌙</span>
      <span class="icon">☀️</span>
      <div :class="['toggle', 'transition', darkmode ? 'checked' : '']"></div>
    </label>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: start;
  align-items: center;
  z-index: 100;
}
.checkbox {
  display: none;
}
.label {
  width: 40px;
  border-radius: 50px;
  border: 1px solid var(--text-color);
  padding: 5px;
  background: var(--bg-dark-mode-toggle);
  cursor: pointer;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
}
.icon {
  font-size: 12px;
}
.toggle {
  position: absolute;
  background-color: var(--bg-secondary);
  border-radius: 70%;
  height: 20px;
  width: 20px;
  transform: translateX(0);
}
.toggle.checked {
  transform: translateX(20px) !important;
}
</style>
