<script setup>
  import Navbar from './Navbar.vue'
</script>

<template>
  <div class="header sans-serif-text white-bg">
    <Navbar/>
  </div>
</template>

<style scoped>
  .header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    overflow: hidden;
    padding: 0px 1%;
    margin-bottom: 20px;
  }
</style>
