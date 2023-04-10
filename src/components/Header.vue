<script setup>
  import DarkModeButton from '@/components/DarkModeButton.vue'
  import NavMenu from '@/components/NavMenu.vue'
  import HamburgerMenu from '@/components/HamburgerMenu.vue'
  import { useHamburgerActiveStore } from '@/stores/hamburger-active'

  // Get the `hamburgerActive` state from the store
  const { deactivateHamburger } = useHamburgerActiveStore()
</script>

<template>
  <div class="header sans-serif-text">
    <DarkModeButton />
    <div v-click-outside="deactivateHamburger">
      <NavMenu />
      <HamburgerMenu />
    </div>
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
