<script setup>
</script>

<template>
  <div class="navbar">
    <router-link to="/press">Press</router-link>
    <router-link to="/podcasts">Podcasts and Webinars</router-link>
    <router-link to="/projects">Personal Projects</router-link>
    <router-link to="/papers">Papers</router-link>
    <router-link to="/posts">Blog</router-link>
    <router-link to="/">About Me</router-link>
  </div>
</template>

<style scoped>
  .navbar {
  }
  .navbar a {
    display: block;
    float: right;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #3b3c36;
    text-align: center;
    padding: 25px 16px;
    text-decoration: none;
    line-height: 20px;
    transition: 0.3s;
  }
  .navbar a:hover {
    color: #0085A1;
    font-size: 15px;
  }
</style>
