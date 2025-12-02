<script lang="ts" setup>
const languageToSurveyUrl: Record<string, string> = {
  Bulgarian:
    "https://btqe-spotcheck.hf.space/dataset/b9af377a-f924-4da0-bebd-4b3444abd245/annotation-mode",
  Czech:
    "https://btqe-spotcheck.hf.space/dataset/d94b2d9f-3f31-4b05-8983-18998888f7dc/annotation-mode",
  Danish:
    "https://btqe-spotcheck.hf.space/dataset/031df55e-f176-4e3a-bd65-72e88d386e88/annotation-mode",
  German:
    "https://btqe-spotcheck.hf.space/dataset/62da66a3-b517-48cf-a397-dc40f42cb674/annotation-mode",
  Greek:
    "https://btqe-spotcheck.hf.space/dataset/e7d44140-4233-4d4e-97bf-9236d2debff8/annotation-mode",
  Spanish:
    "https://btqe-spotcheck.hf.space/dataset/d0deb14e-fac3-41ce-af37-e7dc054812ad/annotation-mode",
  Estonian:
    "https://btqe-spotcheck.hf.space/dataset/35325ece-dff4-4bf1-9b0d-f5fc3944be76/annotation-mode",
  Finnish:
    "https://btqe-spotcheck.hf.space/dataset/b71e5213-bc52-46c5-bed0-4a6aa81960fb/annotation-mode",
  French:
    "https://btqe-spotcheck.hf.space/dataset/b7a4b0da-554e-4010-a84f-d0673139d00f/annotation-mode",
  Hungarian:
    "https://btqe-spotcheck.hf.space/dataset/bccf1f2c-0cab-4b6b-8954-c974579fee57/annotation-mode",
  Italian:
    "https://btqe-spotcheck.hf.space/dataset/cd70c013-985b-47d7-a512-6f2d47edfac2/annotation-mode",
  Lithuanian:
    "https://btqe-spotcheck.hf.space/dataset/2059a81f-edc6-4ed9-9a87-c067e9b36b72/annotation-mode",
  Latvian:
    "https://btqe-spotcheck.hf.space/dataset/52f51c57-b39a-44d3-a449-384f0cc1a00a/annotation-mode",
  Dutch:
    "https://btqe-spotcheck.hf.space/dataset/a8a01307-8195-453e-a3bc-45c0ac53e0a6/annotation-mode",
  Polish:
    "https://btqe-spotcheck.hf.space/dataset/f0d5a55f-3195-4bcc-a248-76652d52ef24/annotation-mode",
  Portuguese:
    "https://btqe-spotcheck.hf.space/dataset/2e669439-9cc9-4643-a93e-e2939d511af0/annotation-mode",
  Romanian:
    "https://btqe-spotcheck.hf.space/dataset/d5602a6b-1481-4d98-8a02-435f4a2d7448/annotation-mode",
  Slovak:
    "https://btqe-spotcheck.hf.space/dataset/84b7bb76-1bce-4707-806d-e751ef8b7f25/annotation-mode",
  Slovenian:
    "https://btqe-spotcheck.hf.space/dataset/dae8bc41-bc89-47d7-9fc6-f8d2fd7aa17b/annotation-mode",
  Swedish:
    "https://btqe-spotcheck.hf.space/dataset/b484f055-2877-43c7-a333-377a35276cf9/annotation-mode",
};

function goToSurvey() {
  const selectElement = document.getElementById(
    "language-select",
  ) as HTMLSelectElement;
  const selectedLanguage = selectElement.value;
  const surveyUrl = languageToSurveyUrl[selectedLanguage];
  window.open(surveyUrl, "_blank");
}
</script>

<template>
  <h1 class="centered">Feedback on the Translation Quality Estimation</h1>
  <p class="centered-box serif-text">
    Thanks for your interest in providing feedback on the translation quality
    estimation of LLMs! The survey should only take about 5 minutes to complete.
    Please select a language which you are fluent in.
  </p>

  <br />
  <br />

  <div class="centered">
    <label for="language-select" class="language-label"
      >Select Language:
    </label>
    <select id="language-select" class="dropdown">
      <option
        v-for="language in Object.keys(languageToSurveyUrl)"
        v-bind:key="language"
        :value="language"
      >
        {{ language }}
      </option>
    </select>
    <button class="button" @click="goToSurvey">Go to Survey</button>
  </div>
</template>

<style scoped>
h1 {
  font-size: 3rem;
}
.language-label {
  font-size: 1.2rem;
  margin-right: 10px;
}
.dropdown {
  font-size: 1rem;
  padding: 5px;
  margin-right: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.button {
  font-size: 1rem;
  padding: 10px 20px;
  color: white;
  background-color: #4a90e2;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.button:hover {
  background-color: #357abd;
}
</style>
