<script setup>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
</script>

<template>
  <Header/>
  <div class="main-view">
    <router-view />
  </div>
  <Footer/>
</template>

<style scoped>
  .main-view {
    margin-top: 90px;
    margin-bottom: 150px;
  }
</style>
