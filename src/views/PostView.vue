<script lang="ts" setup>
import { defineAsyncComponent, ref } from "vue";
import NotFound from "@/components/NotFound.vue";
import hljs from "highlight.js";

// Get props from parent component
const { id } = defineProps({
  id: { type: String, required: true },
});

// Import post content as a component
const PostContent = defineAsyncComponent(() =>
  import(`@/posts/${id}.md`)

    // If the post is not found, return the NotFound component
    .catch((_: Error) => {
      // Hide all DOM elements of class `post-date`
      const postDate: HTMLCollectionOf<HTMLElement> =
        document.getElementsByClassName(
          "post-date",
        ) as HTMLCollectionOf<HTMLElement>;

      for (let i = 0; i < postDate.length; i++) {
        postDate[i].style.display = "none";
      }

      // Return the 404 page
      return NotFound;
    }),
);

// Function that renders all LaTeX equations, called when post is loaded
const renderMathJax = () => {
  (window as any).MathJax.Hub.Queue([
    "Typeset",
    (window as any).MathJax.Hub,
    cleanUpMathJax,
  ]);
};

// Callback function which is called after rendering MathJax, which cleans up the
// MathJax formulas by removing all the MathJax script tags, thus ensuring that the
// tags do not get rendered more than once.
const cleanUpMathJax = () => {
  const mathJaxScripts = document.querySelectorAll('script[type*="math/tex"]');
  mathJaxScripts.forEach((script) => script.remove());
};

// Import title and display it
import(`@/posts/${id}.md`).then((module) => {
  let title = module.frontmatter["title"];
  let title_tags = document.getElementsByClassName("title");
  for (let i = 0; i < title_tags.length; i++) {
    title_tags[i].innerHTML = title;
  }

  let subtitle = module.frontmatter["subtitle"];
  let subtitle_tags: HTMLCollectionOf<HTMLElement> =
    document.getElementsByClassName(
      "subtitle",
    ) as HTMLCollectionOf<HTMLElement>;
  if (subtitle) {
    for (let i = 0; i < subtitle_tags.length; i++) {
      subtitle_tags[i].innerHTML = subtitle;
    }
  } else {
    for (let i = 0; i < subtitle_tags.length; i++) {
      subtitle_tags[i].style.display = "none";
    }
  }
});

// Import date, convert it from "YYYY-MM-DD" to "Month DD, YYYY", and display it
let dateObj = new Date(id.split("-").slice(0, 3).join("-"));
let month = dateObj.toLocaleString("default", { month: "long" });
let day = dateObj.getDate();
let year = dateObj.getFullYear();
const date = ref(`${month} ${day}, ${year}`);
</script>

<template>
  <div class="centered-box">
    <h2 class="title"></h2>
    <p class="subtitle sans-serif-text"></p>
    <div class="margin"></div>
    <p class="post-date serif-text">Posted on {{ date }}</p>
    <div class="serif-text hide-overflow">
      <Suspense
        @resolve="(renderMathJax() as any) & (hljs.highlightAll() as any)"
      >
        <PostContent />
      </Suspense>
    </div>
  </div>
</template>

<style scoped>
.title {
  margin-bottom: 0;
}
.subtitle {
  margin-top: 0;
  margin-bottom: 0;
  font-weight: 400;
  font-size: 23px;
}
.margin {
  margin-bottom: -10px;
}
.post-date {
  margin-bottom: 20px;
  color: gray;
  font-style: italic;
}
.hide-overflow {
  overflow: auto;
}
@media only screen and (max-width: 512px) {
  .subtitle {
    font-size: 18px;
  }
}
</style>
