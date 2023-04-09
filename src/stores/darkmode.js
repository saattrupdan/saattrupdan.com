import { ref } from 'vue'
import cssVariables from '@/assets/css-variables.yaml'
import { defineStore } from 'pinia'

export const useDarkModeStore = defineStore('darkmode', () => {

  // Get the root element, where all the CSS variables are stored
  const root = document.documentElement

  // Set the dark mode depending on the user's preferences
  const darkmode = ref(null)
  if (window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches) {
    darkmode.value = true
    enableDarkMode()
  } else {
    darkmode.value = false
    disableDarkMode()
  }

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

  return { darkmode, enableDarkMode, disableDarkMode, toggleDarkMode }
})
