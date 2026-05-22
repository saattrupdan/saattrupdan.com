<script lang="ts" setup>
import { computed, defineAsyncComponent, ref } from "vue";
import NotFound from "@/components/NotFound.vue";
import { postMeta } from "@/posts/postMeta";

const { id } = defineProps({
  id: { type: String, required: true },
});

const meta = postMeta[id];
const title = computed(() => meta?.title ?? "");
const subtitle = computed(() => meta?.subtitle ?? "");
const date = computed(() => meta?.date ?? "");
const notFound = ref(!meta);

const PostContent = defineAsyncComponent(() =>
  import(`@/posts/${id}.md`).catch((_: Error) => {
    notFound.value = true;
    return NotFound;
  }),
);

const showDate = computed(() => !notFound.value);

// Client-only enhancements: syntax highlighting and MathJax typesetting.
async function enhance() {
  if (typeof window === "undefined") return;
  const [
    { default: hljs },
    bash,
    css,
    javascript,
    julia,
    lua,
    makefile,
    markdown,
    python,
    shell,
    xml,
    yaml,
    ini,
    bnf,
  ] = await Promise.all([
    import("highlight.js/lib/core"),
    import("highlight.js/lib/languages/bash"),
    import("highlight.js/lib/languages/css"),
    import("highlight.js/lib/languages/javascript"),
    import("highlight.js/lib/languages/julia"),
    import("highlight.js/lib/languages/lua"),
    import("highlight.js/lib/languages/makefile"),
    import("highlight.js/lib/languages/markdown"),
    import("highlight.js/lib/languages/python"),
    import("highlight.js/lib/languages/shell"),
    import("highlight.js/lib/languages/xml"),
    import("highlight.js/lib/languages/yaml"),
    import("highlight.js/lib/languages/ini"),
    import("highlight.js/lib/languages/bnf"),
  ]);
  hljs.registerLanguage("bash", bash.default);
  hljs.registerLanguage("bib", bnf.default);
  hljs.registerLanguage("css", css.default);
  hljs.registerLanguage("cypher", bnf.default);
  hljs.registerLanguage("html", xml.default);
  hljs.registerLanguage("ini", ini.default);
  hljs.registerLanguage("javascript", javascript.default);
  hljs.registerLanguage("julia", julia.default);
  hljs.registerLanguage("lua", lua.default);
  hljs.registerLanguage("make", makefile.default);
  hljs.registerLanguage("markdown", markdown.default);
  hljs.registerLanguage("python", python.default);
  hljs.registerLanguage("shell", shell.default);
  hljs.registerLanguage("toml", ini.default);
  hljs.registerLanguage("yaml", yaml.default);
  hljs.highlightAll();

  const mj = (window as any).MathJax;
  if (mj?.typesetPromise) {
    mj.typesetPromise();
  } else if (mj?.startup?.promise) {
    mj.startup.promise.then(() => mj.typesetPromise());
  }
}
</script>

<template>
  <div class="centered-box">
    <h1 v-if="title" class="title">{{ title }}</h1>
    <p v-if="subtitle" class="subtitle sans-serif-text">{{ subtitle }}</p>
    <div class="margin"></div>
    <p v-if="showDate" class="post-date serif-text">Posted on {{ date }}</p>
    <div class="serif-text hide-overflow">
      <Suspense @resolve="enhance">
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
