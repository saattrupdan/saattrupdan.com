<script setup>
</script>

<template>
  <h1 class="centered">Press</h1>
  <div class="centered-box">
    <a href="https://pro.ing.dk/datatech/holdning/dansk-data-science-community-open-source">
      <img src="/press-open-source.jpeg" alt="Open source article"
           class="article invert-on-darkmode"/>
    </a>
    <a href="https://pro.ing.dk/datatech/artikel/forsker-bag-nyt-benchmark-den-gaengse-maade-evaluere-sprogmodeller-paa-i-dag-er">
      <img src="/press-scandeval.jpeg" alt="ScandEval article"
           class="article invert-on-darkmode"/>
    </a>
    <a href="https://pro.ing.dk/datatech/artikel/ny-sprogmodel-er-fintunet-paa-fem-skandinaviske-sprog-og-det-fungerer-overraskende">
      <img src="/press-scandiner.jpeg" alt="ScandiNER article"
           class="article invert-on-darkmode"/>
    </a>
    <a href="https://pro.ing.dk/datatech/artikel/data-scientists-paa-tvaers-af-brancher-brugte-ferie-paa-lave-ny-dansk-sprogmodel">
      <img src="/press-roebaerta.jpeg" alt="RøBÆRTa article"
           class="article invert-on-darkmode"/>
    </a>
  </div>
</template>

<style scoped>
  .article {
    transition: 0.3s;
    width: 80%;
    display: block;
    margin: auto auto 10px auto;
  }
  .article:hover {
    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
</style>
