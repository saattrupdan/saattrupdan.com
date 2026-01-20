<script lang="ts" setup>
import { ref } from "vue";

const today = new Date();
const demoDownDates = [
  new Date("2025-12-11"),
  new Date("2026-01-08"),
  new Date("2026-01-15"),
  new Date("2026-01-27"),
  new Date("2026-01-28"),
  new Date("2026-02-03"),
];
const isDemoDown = ref(
  demoDownDates.some(
    (date) =>
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear(),
  ),
);
const isDemoDownTomorrow = ref(
  demoDownDates.some(
    (date) =>
      date.getDate() === today.getDate() + 1 &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear(),
  ),
);

const demoUrl = "https://5bd1df756b86c0ce04.gradio.live/";
</script>
<template>
  <div class="geomatic-demo-container sans-serif-text">
    <div class="demo-down-message" v-if="isDemoDown && isDemoDownTomorrow">
      Demoen er desværre nede for i dag
      {{ today.toLocaleDateString("da-DK") }} og i morgen, da serveren er
      reserveret til en workshop. Demoen vil være tilgængelig igen i overmorgen.
    </div>
    <div class="demo-down-message" v-else-if="isDemoDown">
      Demoen er desværre nede for i dag {{ today.toLocaleDateString("da-DK") }},
      da serveren er reserveret til en workshop. Demoen vil være tilgængelig
      igen i morgen.
    </div>
    <iframe :src="demoUrl" width="100%" height="100%" frameborder="0" v-else />
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
