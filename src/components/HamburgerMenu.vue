<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useHamburgerActiveStore } from "@/stores/hamburger-active";

// Load the store
const store = useHamburgerActiveStore();

// Get the store's state
const { hamburgerActive } = storeToRefs(store);
const { toggleHamburgerActive } = store;
</script>

<template>
  <div
    :class="['hamburger', hamburgerActive ? 'active' : '']"
    @click="toggleHamburgerActive"
  >
    <div class="bar transition"></div>
    <div class="bar transition"></div>
    <div class="bar transition"></div>
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
  background-color: var(--text-color);
}
@media only screen and (max-width: 512px) {
  .hamburger {
    display: block;
    align-self: center;
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
