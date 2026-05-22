<script lang="ts" setup>
import { defineAsyncComponent, ref } from "vue";
import NotFound from "@/components/NotFound.vue";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import julia from "highlight.js/lib/languages/julia";
import lua from "highlight.js/lib/languages/lua";
import makefile from "highlight.js/lib/languages/makefile";
import markdown from "highlight.js/lib/languages/markdown";
import python from "highlight.js/lib/languages/python";
import shell from "highlight.js/lib/languages/shell";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
import ini from "highlight.js/lib/languages/ini";
import bnf from "highlight.js/lib/languages/bnf";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("bib", bnf);
hljs.registerLanguage("css", css);
hljs.registerLanguage("cypher", bnf);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("ini", ini);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("julia", julia);
hljs.registerLanguage("lua", lua);
hljs.registerLanguage("make", makefile);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("python", python);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("toml", ini);
hljs.registerLanguage("yaml", yaml);

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

// Re-typeset LaTeX equations after a post mounts. MathJax 3 manages its own
// state, so no manual script cleanup is needed.
const renderMathJax = () => {
  const mj = (window as any).MathJax;
  if (mj?.typesetPromise) {
    mj.typesetPromise();
  } else if (mj?.startup?.promise) {
    mj.startup.promise.then(() => mj.typesetPromise());
  }
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
