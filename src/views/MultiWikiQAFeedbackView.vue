<script lang="ts" setup>
const languageToSurveyUrl: Record<string, string> = {
  Abkhaz: "https://forms.cloud.microsoft/e/pdmAKbsRk1",
  Afrikaans: "",
  Albanian: "",
  Amharic: "",
  Arabic: "",
  Aragonese: "",
  Armenian: "",
  Assamese: "",
  Avaric: "",
  Aymara: "",
  Azerbaijani: "",
  Bambara: "",
  Bashkir: "",
  Basque: "",
  Belarusian: "",
  Bengali: "",
  Bislama: "",
  Bosnian: "",
  Breton: "",
  Bulgarian: "",
  Burmese: "",
  Catalan: "",
  Chamorro: "",
  Chechen: "",
  Chichewa: "",
  Chuvash: "",
  Cornish: "",
  Corsican: "",
  Cree: "",
  Croatian: "",
  Czech: "",
  Danish: "https://forms.cloud.microsoft/e/bd7bh4HdwN",
  Divehi: "",
  Dutch: "https://forms.cloud.microsoft/e/SG7CiQ0tHD",
  Dzongkha: "",
  "English (American)": "https://forms.cloud.microsoft/e/srqTJmuZmx",
  Esperanto: "",
  Estonian: "",
  Ewe: "",
  Faroese: "https://forms.cloud.microsoft/e/9dwvhqsCJz",
  Fijian: "",
  Finnish: "https://forms.cloud.microsoft/e/EvPHfYqEpJ",
  French: "https://forms.cloud.microsoft/e/D0USRptpdk",
  "Frisian (Western)": "",
  Fula: "",
  Galician: "",
  Ganda: "",
  Georgian: "",
  German: "https://forms.cloud.microsoft/e/j0gSH5wd2n",
  Greek: "https://forms.cloud.microsoft/e/PSmAYeeYKj",
  Guaraní: "",
  Gujarati: "",
  Haitian: "",
  Hausa: "",
  Hebrew: "",
  Hindi: "",
  Hungarian: "",
  Icelandic: "https://forms.cloud.microsoft/e/u5NfqfXuWw",
  Ido: "",
  Igbo: "",
  Indonesian: "",
  Interlingua: "",
  Interlingue: "",
  Inuktitut: "",
  Inupiaq: "",
  Irish: "",
  Italian: "",
  Japanese: "",
  Kalaallisut: "",
  Kannada: "",
  Kashmiri: "",
  Kazakh: "",
  Khmer: "",
  Kikuyu: "",
  Kinyarwanda: "",
  Kirundi: "",
  Komi: "",
  Kongo: "",
  Korean: "",
  Kurdish: "",
  Kyrgyz: "",
  Lao: "",
  Latin: "",
  Latvian: "https://forms.cloud.microsoft/e/kFGmjbZYLt",
  Limburgish: "",
  Lingala: "",
  Lithuanian: "https://forms.cloud.microsoft/e/TKQFMNfXZc",
  Luxembourgish: "",
  Macedonian: "",
  Malagasy: "",
  Malay: "",
  Malayalam: "",
  Maltese: "",
  "Mandarin (Simplified)": "https://forms.cloud.microsoft/e/XjSq1DqJ7c",
  "Mandarin (Traditional)": "https://forms.cloud.microsoft/e/0FPvLqZaEu",
  Manx: "",
  Māori: "",
  Marathi: "",
  Mongolian: "",
  Navajo: "",
  Nepali: "",
  "Norwegian Bokmål": "https://forms.cloud.microsoft/e/Md0QX4Yx8A",
  "Norwegian Nynorsk": "https://forms.cloud.microsoft/e/vUAsjGUU4i",
  Occitan: "",
  "Old Church Slavonic": "",
  Oriya: "",
  Oromo: "",
  Ossetian: "",
  Pāli: "",
  Panjabi: "",
  Pashto: "",
  Persian: "",
  Polish: "https://forms.cloud.microsoft/e/vrXFzLiRwN",
  Portuguese: "https://forms.cloud.microsoft/e/mSBaZghhJ3",
  Quechua: "",
  Romanian: "",
  Romansh: "",
  Russian: "https://forms.cloud.microsoft/e/5DeJu1EZCB",
  "Sami (Northern)": "",
  Samoan: "",
  Sango: "",
  Sanskrit: "",
  Sardinian: "",
  "Scottish Gaelic": "",
  Serbian: "",
  Shona: "",
  Sindhi: "",
  Sinhala: "",
  Slovak: "",
  Slovenian: "",
  Somali: "",
  "Sotho (Southern)": "",
  Spanish: "",
  Sundanese: "",
  Swahili: "",
  Swati: "",
  Swedish: "https://forms.cloud.microsoft/e/4vhPdYzXqw",
  Tagalog: "",
  Tahitian: "",
  Tajik: "",
  Tamil: "",
  Tatar: "",
  Telugu: "",
  Thai: "",
  Tibetan: "",
  Tigrinya: "",
  Tonga: "",
  Tsonga: "",
  Tswana: "",
  Turkish: "",
  Turkmen: "",
  Twi: "",
  Ukrainian: "https://forms.cloud.microsoft/e/N2KJPx4bpK",
  Urdu: "https://forms.cloud.microsoft/e/MQdX7dzTpX",
  Uyghur: "",
  Uzbek: "",
  Venda: "",
  Vietnamese: "",
  Volapük: "",
  Walloon: "",
  Welsh: "",
  Wolof: "",
  Xhosa: "",
  Yiddish: "",
  Yoruba: "",
  Zhuang: "",
  Zulu: "",
};

function goToSurvey() {
  const selectElement = document.getElementById(
    "language-select",
  ) as HTMLSelectElement;
  const selectedLanguage = selectElement.value;
  const surveyUrl = languageToSurveyUrl[selectedLanguage];
  if (surveyUrl) {
    window.open(surveyUrl, "_blank");
  } else {
    window.open(
      "mailto:dan.smart@alexandra.dk?" +
        "subject=Fluency%20Survey%20Language%20Support - " +
        selectedLanguage +
        "&" +
        "body=I would like to request support for " +
        selectedLanguage +
        " in the fluency survey. Thanks!",
      "_blank",
    );
  }
}
</script>

<template>
  <h1 class="centered">Feedback on the Fluency of LLMs</h1>
  <p class="centered-box serif-text">
    Thanks for your interest in providing feedback on the fluency of LLMs! The
    survey should only take about 5 minutes to complete. Please select a
    language which you are fluent in.
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
