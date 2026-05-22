<script lang="ts" setup>
import Greeting from "@/components/TheGreeting.vue";
import Description from "@/about.md";
import photoUrl from "@/assets/img/itu-photo.webp";
import { useHead } from "@unhead/vue";
import {
  AUTHOR_AFFILIATION,
  AUTHOR_JOB_TITLE,
  AUTHOR_NAME,
  SAME_AS,
  SITE_URL,
} from "@/seo/site";

const wrappedPhotoUrl = `url(${photoUrl})`;

const description =
  "Dan Saattrup Smart is a Principal AI Specialist at the Alexandra Institute with a PhD in mathematics and a postdoc in machine learning, working on research and applied AI for Danish companies.";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR_NAME,
  jobTitle: AUTHOR_JOB_TITLE,
  affiliation: {
    "@type": "ResearchOrganization",
    name: AUTHOR_AFFILIATION,
  },
  url: SITE_URL,
  description,
  sameAs: SAME_AS,
};

useHead({
  title: AUTHOR_NAME,
  meta: [
    { name: "description", content: description },
    { property: "og:title", content: AUTHOR_NAME },
    { property: "og:description", content: description },
    { name: "twitter:title", content: AUTHOR_NAME },
    { name: "twitter:description", content: description },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(personJsonLd),
    },
  ],
});
</script>

<template>
  <Greeting />
  <div class="container">
    <div class="photo-box">
      <div class="photo-croppable"></div>
      <img class="photo" :src="photoUrl" :alt="`Portrait of ${AUTHOR_NAME}`" />
    </div>
    <div class="description-box">
      <div class="serif-text description">
        <Description />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
.photo-box {
  flex: 1 1 0px;
  filter: brightness(var(--image-brightness));
}
.photo-croppable {
  height: 100%;
  background-image: v-bind("wrappedPhotoUrl");
  background-position: right;
  background-repeat: no-repeat;
  background-size: cover;
}
.photo {
  visibility: hidden;
  display: none;
}
.description-box {
  flex: 1 1 0px;
  background: var(--bg-box);
}
:deep(.description-box *) {
  background-color: transparent;
}
.description {
  margin: 5% 10% 10% 10%;
}
@media (max-width: 750px) {
  .container {
    flex-wrap: wrap;
  }
  .photo-box {
    flex-basis: 100%;
  }
  .photo {
    display: block;
  }
}
</style>
