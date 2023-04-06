import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useHamburgerActiveStore = defineStore('hamburger-active', () => {
  const hamburgerActive = ref(false)
  function toggleHamburgerActive() {
    hamburgerActive.value = !hamburgerActive.value
  }
  return { hamburgerActive, toggleHamburgerActive }
})
