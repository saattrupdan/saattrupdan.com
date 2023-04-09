<script setup>
  import { storeToRefs } from 'pinia'
  import { useHamburgerActiveStore } from '@/stores/hamburger-active'

  // Load the store
  const store = useHamburgerActiveStore()

  // Get the store's state
  const { hamburgerActive } = storeToRefs(store)
  const { toggleHamburgerActive } = store
</script>

<template>
  <div
    :class="hamburgerActive ? 'hamburger active' : 'hamburger'"
    @click="toggleHamburgerActive"
  >
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </div>
</template>

<style scoped>
  .hamburger {
    display: none;
  }
  .bar {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    background-color: var(--text-color);
  }
  @media only screen and (max-width: 768px) {
    .hamburger {
      display: block;
      cursor: pointer;
    }
    .hamburger.active .bar:nth-child(2) {
      opacity: 0;
    }
    .hamburger.active .bar:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    .hamburger.active .bar:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }
</style>
