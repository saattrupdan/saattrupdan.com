<script lang="ts" setup>
const languageToSurveyUrl: Record<string, string> = {
  Abkhazian: "https://forms.cloud.microsoft/e/pdmAKbsRk1",
  Acehnese: "",
  Adyghe: "",
  Afar: "",
  Afrikaans: "",
  Albanian: "",
  "Altai, Southern": "",
  Amharic: "",
  Amis: "",
  Angika: "",
  Arabic: "",
  "Arabic, Egyptian": "",
  "Arabic, Moroccan": "",
  Aragonese: "",
  Aramaic: "",
  Armenian: "https://forms.cloud.microsoft/e/NZELTS300U",
  "Armenian, Western": "",
  Arpitan: "",
  Assamese: "",
  Asturian: "",
  Atayal: "",
  Atikamekw: "",
  Avaric: "",
  Avestan: "",
  Awadhi: "",
  Aymara: "",
  Azerbaijani: "https://forms.cloud.microsoft/e/7FNGAwTJtp",
  "Azerbaijani, Southern": "",
  Balinese: "",
  Bambara: "",
  Banjar: "",
  Bashkir: "https://forms.cloud.microsoft/e/HLahp4Q5X6",
  Basque: "",
  Bavarian: "https://forms.cloud.microsoft/e/Y1SyQHJSU8",
  Belarusian: "",
  Bengali: "",
  "Bikol, Central": "",
  Bishnupriya: "",
  Bislama: "",
  Bosnian: "",
  Breton: "",
  Buginese: "",
  Bulgarian: "",
  Buriat: "",
  Burmese: "",
  Cantonese: "",
  Catalan: "",
  Cebuano: "",
  Chamorro: "",
  Chechen: "",
  Cherokee: "",
  Cheyenne: "",
  Chichewa: "",
  "Chinese, Gan": "",
  "Chinese, Hakka": "",
  "Chinese, Mindong": "",
  "Chinese, Simplified": "https://forms.cloud.microsoft/e/XjSq1DqJ7c",
  "Chinese, Traditional": "https://forms.cloud.microsoft/e/0FPvLqZaEu",
  "Chinese, Wu": "",
  Chuvash: "",
  Cornish: "",
  Corsican: "",
  Cree: "",
  Croatian: "",
  Czech: "",
  Dagbani: "",
  Danish: "https://forms.cloud.microsoft/e/bd7bh4HdwN",
  Dimli: "",
  Dinka: "",
  Divehi: "",
  Doteli: "",
  Dutch: "https://forms.cloud.microsoft/e/SG7CiQ0tHD",
  Dzongkha: "",
  "English, American": "https://forms.cloud.microsoft/e/srqTJmuZmx",
  "English, Old": "",
  Erzya: "",
  Esperanto: "",
  Estonian: "https://forms.cloud.microsoft/e/K6SSDsm0Jy",
  Ewe: "",
  Extremaduran: "",
  Fanti: "",
  Faroese: "https://forms.cloud.microsoft/e/9dwvhqsCJz",
  Fijian: "",
  "Fiji Hindi": "",
  Finnish: "https://forms.cloud.microsoft/e/EvPHfYqEpJ",
  "Flemish, Western": "",
  Fon: "",
  Frafra: "",
  French: "https://forms.cloud.microsoft/e/D0USRptpdk",
  "Frisian, Northern": "",
  "Frisian, Western": "",
  "Frisian, Saterland": "",
  Friulian: "",
  Fulah: "",
  Gaelic: "",
  Gagauz: "",
  Galician: "",
  Ganda: "",
  Georgian: "",
  German: "https://forms.cloud.microsoft/e/j0gSH5wd2n",
  "German, Low": "",
  "German, Pennsylvania": "",
  "Ghanaian Pidgin": "",
  Gilaki: "",
  "Goan Konkani": "",
  Gorontalo: "",
  Gothic: "",
  Greek: "https://forms.cloud.microsoft/e/PSmAYeeYKj",
  Greenlandic: "",
  Guarani: "",
  "Guianan Creole": "",
  Gujarati: "",
  Gun: "",
  Haitian: "",
  Hausa: "",
  Hawaiian: "",
  Hebrew: "https://forms.cloud.microsoft/e/RZBPBywSp8",
  Herero: "",
  Hindi: "",
  Hungarian: "",
  Icelandic: "https://forms.cloud.microsoft/e/u5NfqfXuWw",
  Ido: "",
  Igbo: "",
  Iloko: "",
  Indonesian: "",
  Ingush: "",
  Interlingua: "",
  Interlingue: "",
  Inuktitut: "",
  Inupiaq: "",
  Irish: "",
  Italian: "",
  "Jamaican Creole": "",
  Japanese: "",
  Kabardian: "",
  Kabiyè: "",
  Kabyle: "",
  Kalmyk: "",
  Kannada: "",
  Kanuri: "",
  "Karachay-Balkar": "",
  "Kara-Kalpak": "https://forms.cloud.microsoft/e/wX20Gx8UN4",
  Kashmiri: "",
  Kashubian: "",
  Kazakh: "",
  "Khmer, Central": "",
  Kikuyu: "",
  Kinyarwanda: "",
  Kirghiz: "",
  Komi: "",
  "Komi-Permyak": "",
  Kongo: "",
  Korean: "",
  Kotava: "",
  Kuanyama: "",
  Kurdish: "",
  "Kurdish, Central": "",
  Ladin: "",
  Ladino: "",
  Lak: "",
  Lao: "",
  Latgalian: "",
  Latin: "",
  Latvian: "https://forms.cloud.microsoft/e/kFGmjbZYLt",
  Lezghian: "",
  Ligurian: "",
  Limburgan: "",
  Lingala: "",
  "Lingua Franca Nova": "",
  Lithuanian: "https://forms.cloud.microsoft/e/TKQFMNfXZc",
  "Livvi-Karelian": "",
  Lojban: "",
  Lombard: "",
  "Luba-Katanga": "",
  Luxembourgish: "",
  Macedonian: "",
  Madurese: "",
  Maithili: "",
  Malagasy: "",
  Malay: "",
  Malayalam: "",
  Maltese: "",
  Manipuri: "",
  Manx: "",
  Maori: "",
  Marathi: "",
  "Mari, Eastern": "",
  "Mari, Western": "",
  Marshallese: "",
  Mazanderani: "",
  Minangkabau: "",
  Mingrelian: "",
  Mirandese: "",
  Moksha: "",
  Mon: "",
  Mongolian: "",
  Nauru: "",
  Navajo: "",
  "Ndebele, Northern": "",
  "Ndebele, Southern": "",
  Ndonga: "",
  Neapolitan: "",
  Nepali: "",
  Newari: "",
  Nias: "",
  "N'Ko": "",
  "Norwegian Bokmål": "https://forms.cloud.microsoft/e/Md0QX4Yx8A",
  "Norwegian Nynorsk": "https://forms.cloud.microsoft/e/vUAsjGUU4i",
  Novial: "",
  Occitan: "",
  Ojibwa: "",
  Oriya: "",
  Oromo: "",
  Ossetian: "https://forms.cloud.microsoft/e/k5EEUsayGk",
  Paiwan: "",
  "Palatine German": "",
  Pali: "",
  Pampanga: "",
  Pangasinan: "",
  "Pa'O": "",
  Papiamento: "",
  Pashto: "",
  Persian: "",
  Picard: "",
  "Nigerian Pidgin": "",
  Piemontese: "",
  Polish: "https://forms.cloud.microsoft/e/vrXFzLiRwN",
  Pontic: "",
  Portuguese: "https://forms.cloud.microsoft/e/mSBaZghhJ3",
  Punjabi: "",
  "Punjabi, Western": "",
  Quechua: "",
  "Romani, Vlax": "",
  Romanian: "",
  Romansh: "",
  Rundi: "",
  Russian: "https://forms.cloud.microsoft/e/5DeJu1EZCB",
  Rusyn: "",
  Sakizaya: "",
  "Sami, Inari": "",
  "Sami, Northern": "",
  Samoan: "",
  Sango: "",
  Sanskrit: "",
  Santali: "",
  Saraiki: "",
  Sardinian: "",
  Scots: "",
  Serbian: "",
  Shan: "",
  Shona: "",
  Sicilian: "",
  Silesian: "",
  Sindhi: "",
  Sinhala: "",
  "Slavic, Church": "",
  Slovak: "",
  Slovenian: "",
  Somali: "",
  "Sorbian, Lower": "",
  "Sorbian, Upper": "",
  Sotho: "",
  "Sotho, Northern": "",
  Spanish: "",
  Sundanese: "",
  Swahili: "",
  Swati: "",
  Swedish: "https://forms.cloud.microsoft/e/4vhPdYzXqw",
  Tachelhit: "",
  Tagalog: "",
  Tahitian: "",
  Tajik: "",
  Talysh: "",
  Tamil: "",
  Taroko: "",
  Tatar: "https://forms.cloud.microsoft/e/3diVuJcWgS",
  "Tatar, Crimean": "",
  Telugu: "",
  Tetum: "",
  Thai: "",
  Tibetan: "",
  Tigrinya: "",
  "Tok Pisin": "",
  Tonga: "",
  Sranan: "",
  Tsonga: "",
  Tswana: "",
  Tulu: "",
  Tumbuka: "",
  Turkish: "https://forms.cloud.microsoft/e/L7PBNTra3P",
  Turkmen: "",
  Tuvinian: "https://forms.cloud.microsoft/e/UpkZ04PMmZ",
  Twi: "",
  Tyap: "",
  Udmurt: "https://forms.cloud.microsoft/e/7reidV6VAW",
  Uighur: "",
  Ukrainian: "https://forms.cloud.microsoft/e/N2KJPx4bpK",
  Urdu: "https://forms.cloud.microsoft/e/MQdX7dzTpX",
  Uzbek: "",
  Venda: "",
  Venetian: "",
  Veps: "",
  Vietnamese: "",
  Volapük: "",
  Walloon: "",
  Waray: "",
  Wayuu: "",
  Welsh: "",
  Wolof: "",
  Xhosa: "",
  Yakut: "",
  Yiddish: "",
  Yoruba: "",
  Zeelandic: "",
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
