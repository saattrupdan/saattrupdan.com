<script setup>
  import { ref } from 'vue'
  const hamburgerMenuVisible = ref(false);
</script>

<template>
  <nav class="navbar" id="navbar">
    <div :class="hamburgerMenuVisible ? 'nav-menu active' : 'nav-menu'">
      <router-link class="nav-item" @click.native="hamburgerMenuVisible = false" to="/">
        About Me
      </router-link>
      <router-link class="nav-item" @click.native="hamburgerMenuVisible = false" to="/posts">
        Blog
      </router-link>
      <router-link class="nav-item" @click.native="hamburgerMenuVisible = false" to="/papers">
        Papers
      </router-link>
      <router-link class="nav-item" @click.native="hamburgerMenuVisible = false" to="/projects">
        Projects
      </router-link>
      <router-link class="nav-item" @click.native="hamburgerMenuVisible = false" to="/podcasts">
        Podcasts
      </router-link>
      <router-link class="nav-item" @click.native="hamburgerMenuVisible = false" to="/press">
        Press
      </router-link>
    </div>
    <div
      :class="hamburgerMenuVisible ? 'hamburger active' : 'hamburger'"
      @click="hamburgerMenuVisible = !hamburgerMenuVisible"
    >
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
  </nav>
</template>

<style scoped>
  .navbar {
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 1.3rem 1.3rem;
  }
  .nav-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .navbar a {
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #3b3c36;
    text-align: center;
    margin-left: 1.7rem;
    text-decoration: none;
    line-height: 20px;
    transition: 0.3s;
  }
  .navbar a:hover {
    color: #0085A1;
    font-size: 14px;
  }
  .nav-item {
    margin-left: 5rem;
  }
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
    background-color: #101010;
  }
  @media only screen and (max-width: 768px) {
    .nav-menu {
      position: fixed;
      left: 0;
      top: -100%;
      flex-direction: column;
      background-color: #fff;
      width: 100%;
      border-radius: 10px;
      text-align: center;
      transition: 0.3s;
      box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    }
    .nav-item {
      margin: 0.5rem 0;
    }
    .nav-menu.active {
      top: 4.0rem;
    }
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
