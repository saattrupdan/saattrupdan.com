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
  <div :class="['nav-menu', 'transition', hamburgerActive ? 'active' : '']">
    <router-link class="nav-item transition" @click.native="toggleHamburgerActive" to="/">
      About Me
    </router-link>
    <router-link class="nav-item transition" @click.native="toggleHamburgerActive" to="/posts">
      Blog
    </router-link>
    <router-link class="nav-item transition" @click.native="toggleHamburgerActive" to="/papers">
      Papers
    </router-link>
    <router-link class="nav-item transition" @click.native="toggleHamburgerActive" to="/projects">
      Projects
    </router-link>
    <router-link class="nav-item transition" @click.native="toggleHamburgerActive" to="/podcasts">
      Podcasts
    </router-link>
    <router-link class="nav-item transition" @click.native="toggleHamburgerActive" to="/press">
      Press
    </router-link>
  </div>
</template>

<style scoped>
  .nav-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nav-item {
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text-color); /* #3b3c36; */
    text-align: center;
    margin-left: 1.7rem;
    text-decoration: none;
    line-height: 20px;
  }
  .nav-item:hover {
    color: #0085A1;
    font-size: 14px;
  }
  @media only screen and (max-width: 768px) {
    .nav-menu {
      position: fixed;
      left: 0;
      top: -100%;
      flex-direction: column;
      background-color: var(--bg-secondary);
      width: 100%;
      border-radius: 10px;
      text-align: center;
      box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    }
    .nav-item {
      margin: 0.5rem 0;
    }
    .nav-menu.active {
      top: 4.0rem;
    }
  }
</style>
