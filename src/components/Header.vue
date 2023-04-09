<script setup>
  import DarkModeButton from './DarkModeButton.vue'
  import NavMenu from './NavMenu.vue'
  import HamburgerMenu from './HamburgerMenu.vue'
</script>

<template>
  <div class="header sans-serif-text">
    <DarkModeButton />
    <NavMenu />
    <HamburgerMenu />
  </div>
</template>

<style scoped>
  .header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    padding: 1.3rem 1.3rem;
    overflow: hidden;
    margin-bottom: 20px;
    z-index: 9999;
    background-color: var(--bg-secondary);
  }
</style>
