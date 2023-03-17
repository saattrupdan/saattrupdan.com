<script setup>
</script>

<template>
  <div class="topnav sans-serif-text">
    <div class="topnav-brand">
      <router-link to="/">Dan Saattrup Nielsen</router-link>
    </div>
    <div class="topnav-links">
      <router-link to="/projects">Projects and Demos</router-link>
      <router-link to="/papers">Papers</router-link>
      <router-link to="/">About me</router-link>
      <router-link to="/posts">Blog</router-link>
    </div>
    <img src="/avatar-icon.png" alt="avatar" class="avatar"/>
  </div>

  <!-- Render the current view !-->
  <div class="top-margin">
    <router-view />
  </div>
</template>

<style scoped>

  /* Add a black background color to the top navigation */
  .topnav {
    background-color: #F5F5F5;
    overflow: hidden;
    padding: 10px 15px;
    margin-bottom: 20px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
  }

  /* Style the links inside the navigation bar */
  .topnav a {
    display: block;
    color: #3b3c36;
    text-align: center;
    padding: 25px 16px;
    text-decoration: none;
    line-height: 20px;
    font-weight: 800;
  }

  /* Change the color of links on hover */
  .topnav a:hover {
    color: #0085A1;
  }

  .topnav-brand a {
    float: left;
    font-size: 1.1rem;
  }

  .topnav-links a {
    float: right;
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 1px;
  }

  .top-margin {
    margin-top: 120px;
  }

  .avatar {
    position: fixed;
    left: 47%;
    border-radius: 50%;
  }

</style>
