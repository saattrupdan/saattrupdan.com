// Enumerates blog post slugs from the markdown files in this directory.
// Vite resolves `import.meta.glob` at build time, so this stays in sync with
// the filesystem without a generator step.
const modules = import.meta.glob("./*.md");
const postNames = Object.keys(modules)
  .map((path) => path.replace(/^\.\//, "").replace(/\.md$/, ""))
  .sort()
  .reverse();

export default postNames;
