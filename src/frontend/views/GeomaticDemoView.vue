<script lang="ts" setup></script>
<template>
  <div class="geomatic-demo-container sans-serif-text">
    <!--
    <div class="demo-down-message">
      Demoen er desværre nede for i dag, da serveren er reserveret til en
      workshop. Prøv igen i morgen.
    </div>
    -->

    <iframe
      src="https://bb880bfb68d95c13d3.gradio.live/"
      width="100%"
      height="100%"
      frameborder="0"
    />
  </div>
</template>
<style scoped>
.geomatic-demo-container {
  width: 100%;
  height: 100vh;
  margin: -100px 0 -150px 0;
  padding: 0;
  overflow: hidden;
}
.geomatic-demo-container iframe {
  display: block;
  border: none;
}
.demo-down-message {
  font-size: 1.5rem;
  color: var(--text-color);
  text-align: center;
  margin-top: 20%;
}
</style>
