<script setup>
  // If the current year is greater than 2023 then we want to use "2023-<current year>"
  // as the year range. Otherwise we just want to use the current year.
  const year = new Date().getFullYear()
  const yearRange = year > 2023 ? "2023 - " + year : year
</script>

<template>
  <div class="footer sans-serif-text">

    <!-- Social media links -->
    <p class="social-icons">
      <a href="https://github.com/saattrupdan">
        <img src="/github-icon.png" alt="github"
             class="footer-icon invert-on-darkmode"/>
      </a>
      <a href="https://www.linkedin.com/in/saattrupdan/">
        <img src="/linkedin-icon.png" alt="linkedin"
             class="footer-icon invert-on-darkmode"/>
      </a>
      <a href="https://scholar.google.com/citations?user=aNojQDEAAAAJ&hl=en">
        <img src="/scholar-icon.png" alt="scholar"
             class="footer-icon invert-on-darkmode"/>
      </a>
    </p>

    <!-- Copyright -->
    <p>© {{ yearRange }} Dan Saattrup Nielsen</p>

  </div>
</template>

<style scoped>
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    padding: 0px 1%;
    font-size: 13px;
    text-align: center;
    z-index: 9999;
    background-color: var(--bg-header-footer);
  }
  .footer-icon {
    width: 35px;
    height: 35px;
    margin: 0 8px;
    transition: 0.3s;
  }
  .footer-icon:hover {
    opacity: 0.6;
  }
</style>
