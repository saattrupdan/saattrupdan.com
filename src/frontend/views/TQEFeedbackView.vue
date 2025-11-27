<script lang="ts" setup>
const languageToSurveyUrl: Record<string, string> = {
  Danish:
    "https://btqe-spotcheck.hf.space/dataset/db2c216c-42d4-49e5-981e-3f1115c0278d/annotation-mode",
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
    estimatino of LLMs! The survey should only take about 5 minutes to complete.
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
