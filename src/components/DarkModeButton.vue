<script setup>
  import { storeToRefs } from 'pinia'
  import { useDarkModeStore } from '@/stores/darkmode'

  // Load the store
  const store = useDarkModeStore()

  // Get the store's state
  const { darkmode } = storeToRefs(store)
  const { toggleDarkMode } = store
</script>

<template>
  <div class="container-center">
    <input
      @change="toggleDarkMode"
      id="checkbox"
      type="checkbox"
      class="switch-checkbox"
    />
    <label for="checkbox" class="switch-label">
      <span>🌙</span>
      <span>☀️</span>
      <div :class="['switch-toggle', darkmode ? 'checked' : '']"></div>
    </label>
  </div>

</template>

<style scoped>
  .container-center {
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .card {
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
    transition: background 0.5s ease;
    justify-content: space-between;
  }
  .switch-toggle {
    position: absolute;
    background-color: var(--bg-header-footer);
    border-radius: 70%;
    height: 25px;
    width: 25px;
    transform: translateX(0);
    transition: transform 0.3s ease, background-color 0.5s ease;
  }
  .switch-toggle.checked {
    transform: translateX(25px) !important;
  }
</style>
