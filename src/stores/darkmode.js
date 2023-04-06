import { ref } from 'vue'
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
    root.style.setProperty('--bg-main', '#2d2d2d')
    root.style.setProperty('--bg-header-footer', '#393939')
    root.style.setProperty('--bg-box', '#393939')
    root.style.setProperty('--bg-table', '#3d3d3d')
    root.style.setProperty('--bg-code-1', '#3a3a3a')
    root.style.setProperty('--bg-code-2', '#3d3d3d')
    root.style.setProperty('--bg-dark-mode-toggle', '#777777')
    root.style.setProperty('--title-color', '#dedede')
    root.style.setProperty('--text-color', '#dedede')
    root.style.setProperty('--link-color', '#dedede')
    root.style.setProperty('--quote-color', '#c0c0c0')
    root.style.setProperty('--image-brightness', '80%')
    root.style.setProperty('--image-inverted', '100%')
  }

  function disableDarkMode() {
    darkmode.value = false
    root.style.setProperty('--bg-main', '#F5F4F2')
    root.style.setProperty('--bg-header-footer', 'white')
    root.style.setProperty('--bg-box', '#e4e0e0')
    root.style.setProperty('--bg-table', '#f2f2f2')
    root.style.setProperty('--bg-code-1', '#e3e3e3')
    root.style.setProperty('--bg-code-2', '#ececec')
    root.style.setProperty('--bg-dark-mode-toggle', '#bcbcbc')
    root.style.setProperty('--title-color', '#3b3c36')
    root.style.setProperty('--text-color', '#3b3c36')
    root.style.setProperty('--link-color', '#3b3c36')
    root.style.setProperty('--quote-color', '#808080')
    root.style.setProperty('--image-brightness', '100%')
    root.style.setProperty('--image-inverted', '0%')
  }

  function toggleDarkMode() {
    darkmode.value ? disableDarkMode() : enableDarkMode()
  }

  return { darkmode, enableDarkMode, disableDarkMode, toggleDarkMode }
})
