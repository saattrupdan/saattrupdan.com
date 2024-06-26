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
    enableDarkMode()
  } else {
    disableDarkMode()
  }
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
