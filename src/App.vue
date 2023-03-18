<script setup>
</script>

<template>
  <div class="header-footer topnav sans-serif-text">

    <!-- Navigation bar -->
    <div class="right">
      <router-link to="/press">Press</router-link>
      <router-link to="/podcasts">Podcasts and Webinars</router-link>
      <router-link to="/projects">Personal Projects</router-link>
      <router-link to="/papers">Papers</router-link>
      <router-link to="/posts">Blog</router-link>
      <router-link to="/">About Me</router-link>
    </div>
  </div>

  <!-- Render the current view !-->
  <div class="margins">
    <router-view />
  </div>

  <!-- Footer -->
  <div class="header-footer footer sans-serif-text">
    <p class="social-icons">
      <a href="https://github.com/saattrupdan">
        <img src="/github-icon.png" alt="github" class="footer-icon"/>
      </a>
      <a href="https://www.linkedin.com/in/saattrupdan/">
        <img src="/linkedin-icon.png" alt="linkedin" class="footer-icon"/>
      </a>
      <a href="https://scholar.google.com/citations?user=aNojQDEAAAAJ&hl=en">
        <img src="/scholar-icon.png" alt="scholar" class="footer-icon"/>
      </a>
    </p>
    <p class="copyright">
      <p>© 2023 Dan Saattrup Nielsen</p>
    </p>
  </div>

</template>

<style scoped>

  .footer-icon {
    width: 30px;
    height: 30px;
    margin: 0 8px;
    transition: 0.3s;
  }

  .footer-icon:hover {
    opacity: 0.6;
  }

  .header-footer {
    background-color: #F5F5F5;
    overflow: hidden;
    padding: 0px 1%;
    position: fixed;
    left: 0;
    right: 0;
  }

  .footer {
    bottom: 0;
    font-size: 14px;
    text-align: center;
  }

  .topnav {
    margin-bottom: 20px;
    top: 0;
  }

  .topnav a {
    display: block;
    color: #3b3c36;
    text-align: center;
    padding: 25px 16px;
    text-decoration: none;
    line-height: 20px;
    transition: 0.3s;
  }

  .topnav a:hover {
    color: #0085A1;
    font-size: 13px;
  }

  .right a {
    float: right;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .margins {
    margin-top: 90px;
    margin-bottom: 150px;
  }


</style>
