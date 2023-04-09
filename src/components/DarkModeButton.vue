<script setup>
  import { ref } from 'vue'
  import cssVariables from '@/assets/css-variables.yaml'

  // Get the root element, where all the CSS variables are stored
  const root = document.documentElement

  // Initialise the `darkmode` variable
  const darkmode = ref(null)

  function enableDarkMode() {
    darkmode.value = true
    for (const [key, value] of Object.entries(cssVariables.darkmode)) {
      root.style.setProperty(`--${key}`, String(value))
    }
  }

  function disableDarkMode() {
    darkmode.value = false
    for (const [key, value] of Object.entries(cssVariables.lightmode)) {
      root.style.setProperty(`--${key}`, String(value))
    }
  }

  function toggleDarkMode() {
    darkmode.value ? disableDarkMode() : enableDarkMode()
  }

  // Set the dark mode depending on the user's preferences
  if (window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches) {
    darkmode.value = true
    enableDarkMode()
  } else {
    darkmode.value = false
    disableDarkMode()
  }
</script>

<template>
  <div class="container-center">
    <input
      @change="toggleDarkMode"
      id="checkbox"
      type="checkbox"
      class="switch-checkbox"
    />
    <label for="checkbox" class="switch-label transition">
      <span>🌙</span>
      <span>☀️</span>
      <div :class="['switch-toggle', 'transition', darkmode ? 'checked' : '']"></div>
    </label>
  </div>

</template>

<style scoped>
  .container-center {
    display: flex;
    justify-content: start;
    align-items: center;
    z-index: 100;
  }
  .switch-checkbox {
    display: none;
  }
  .switch-label {
    width: 50px;
    border-radius: 50px;
    border: 1px solid var(--text-color);
    padding: 5px;
    background: var(--bg-dark-mode-toggle);
    cursor: pointer;
    display: flex;
    position: relative;
    justify-content: space-between;
  }
  .switch-toggle {
    position: absolute;
    background-color: var(--bg-secondary);
    border-radius: 70%;
    height: 25px;
    width: 25px;
    transform: translateX(0);
  }
  .switch-toggle.checked {
    transform: translateX(25px) !important;
  }
</style>
