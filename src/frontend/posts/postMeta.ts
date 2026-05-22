// Eagerly imports frontmatter for every post so SSR and client both have
// synchronous access to titles, subtitles, and descriptions without async
// dynamic imports.
interface Frontmatter {
  title?: string;
  subtitle?: string;
  meta?: string;
  tags?: string;
}

const modules = import.meta.glob<{ frontmatter: Frontmatter }>("./*.md", {
  eager: true,
});

export interface PostMeta {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  tags: string;
}

function slugFromPath(path: string): string {
  return path.replace(/^\.\//, "").replace(/\.md$/, "");
}

function formatDate(id: string): string {
  const dateObj = new Date(id.split("-").slice(0, 3).join("-"));
  return `${dateObj.toLocaleString("default", { month: "long" })} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
}

export const postMeta: Record<string, PostMeta> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => {
    const id = slugFromPath(path);
    const fm = mod.frontmatter ?? {};
    return [
      id,
      {
        id,
        title: fm.title ?? "",
        subtitle: fm.subtitle ?? "",
        description: fm.meta ?? "",
        date: formatDate(id),
        tags: fm.tags ?? "",
      },
    ];
  }),
);

export const postIds: string[] = Object.keys(postMeta).sort().reverse();
