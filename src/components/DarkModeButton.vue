<script setup>
  import { ref } from 'vue'
  import cssVariables from '@/assets/css-variables.yaml'

  // Get the root element, where all the CSS variables are stored
  const root = document.documentElement

  // Initialise the `darkmode` variable
  const darkmode = ref(null)

  // Function that enables dark mode by setting all the dark mode CSS variables
  function enableDarkMode() {
    darkmode.value = true
    for (let [key, value] of Object.entries(cssVariables.darkmode)) {
      root.style.setProperty(`--${key}`, value)
    }
  }

  // Function that disables dark mode by setting all the light mode CSS variables
  function disableDarkMode() {
    darkmode.value = false
    for (let [key, value] of Object.entries(cssVariables.lightmode)) {
      root.style.setProperty(`--${key}`, value)
    }
  }

  // Initialise the dark mode depending on the user's preferences
  if (window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches) {
    darkmode.value = true
    enableDarkMode()
  } else {
    darkmode.value = false
    disableDarkMode()
  }
</script>

<template>
  <div class="container">
    <input
      @change="darkmode.value ? disableDarkMode() : enableDarkMode()"
      id="checkbox"
      type="checkbox"
      class="checkbox"
    />
    <label for="checkbox" class="label transition">
      <span>🌙</span>
      <span>☀️</span>
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
  .toggle {
    position: absolute;
    background-color: var(--bg-secondary);
    border-radius: 70%;
    height: 25px;
    width: 25px;
    transform: translateX(0);
  }
  .toggle.checked {
    transform: translateX(25px) !important;
  }
</style>
