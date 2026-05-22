import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = "https://www.saattrupdan.com";
const SITE_TITLE = "Dan Saattrup Smart";
const SITE_SUBTITLE = "Blog posts by Dan Saattrup Smart";
const AUTHOR_NAME = "Dan Saattrup Smart";

interface PostEntry {
  slug: string;
  title: string;
  summary: string;
  isoDate: string; // YYYY-MM-DD
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function parseFrontmatter(source: string): Record<string, string> {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm: Record<string, string> = {};
  let currentKey: string | null = null;
  for (const rawLine of match[1].split("\n")) {
    const line = rawLine.replace(/\r$/, "");
    const kv = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (kv) {
      currentKey = kv[1];
      fm[currentKey] = kv[2].trim();
    } else if (currentKey && /^\s+/.test(line)) {
      fm[currentKey] = `${fm[currentKey]} ${line.trim()}`.trim();
    }
  }
  return fm;
}

function loadPosts(postsDir: string): PostEntry[] {
  return readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const isoDate = slug.split("-").slice(0, 3).join("-");
      const fm = parseFrontmatter(
        readFileSync(resolve(postsDir, file), "utf8"),
      );
      return {
        slug,
        isoDate,
        title: fm.title ?? slug,
        summary: fm.meta ?? "",
      };
    })
    .sort((a, b) => (a.isoDate < b.isoDate ? 1 : -1));
}

function priorityFor(path: string): string {
  if (path === "/") return "1.0";
  if (["/posts", "/papers", "/projects", "/talks"].includes(path)) return "0.8";
  if (path.startsWith("/posts/")) return "0.6";
  return "0.5";
}

function buildSitemap(
  posts: PostEntry[],
  staticPaths: string[],
  buildDate: string,
): string {
  const entries: { path: string; lastmod: string }[] = [];
  for (const path of staticPaths) {
    entries.push({ path, lastmod: buildDate });
  }
  for (const post of posts) {
    entries.push({ path: `/posts/${post.slug}`, lastmod: post.isoDate });
  }

  const urls = entries
    .map(
      ({ path, lastmod }) =>
        `  <url>\n` +
        `    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `    <priority>${priorityFor(path)}</priority>\n` +
        `  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildAtom(posts: PostEntry[]): string {
  const latest = posts[0]?.isoDate ?? new Date().toISOString().slice(0, 10);
  const entries = posts
    .map((post) => {
      const url = `${SITE_URL}/posts/${post.slug}`;
      const published = `${post.isoDate}T00:00:00Z`;
      return (
        `  <entry>\n` +
        `    <title>${escapeXml(post.title)}</title>\n` +
        `    <link rel="alternate" type="text/html" href="${escapeXml(url)}"/>\n` +
        `    <id>${escapeXml(url)}</id>\n` +
        `    <published>${published}</published>\n` +
        `    <updated>${published}</updated>\n` +
        `    <summary>${escapeXml(post.summary)}</summary>\n` +
        `  </entry>`
      );
    })
    .join("\n");

  return (
    `<?xml version="1.0" encoding="UTF-8" ?>\n` +
    `<feed xmlns="http://www.w3.org/2005/Atom">\n` +
    `  <title>${escapeXml(SITE_TITLE)}</title>\n` +
    `  <link rel="alternate" type="text/html" href="${SITE_URL}/"/>\n` +
    `  <link rel="self" type="application/atom+xml" href="${SITE_URL}/atom.xml"/>\n` +
    `  <subtitle>${escapeXml(SITE_SUBTITLE)}</subtitle>\n` +
    `  <updated>${latest}T00:00:00Z</updated>\n` +
    `  <id>${SITE_URL}/</id>\n` +
    `  <author>\n    <name>${escapeXml(AUTHOR_NAME)}</name>\n  </author>\n` +
    `${entries}\n` +
    `</feed>\n`
  );
}

export function writeFeeds(opts: {
  postsDir: string;
  outDir: string;
  staticPaths: string[];
}) {
  const posts = loadPosts(opts.postsDir);
  const buildDate = new Date().toISOString().slice(0, 10);
  writeFileSync(
    resolve(opts.outDir, "sitemap.xml"),
    buildSitemap(posts, opts.staticPaths, buildDate),
  );
  writeFileSync(resolve(opts.outDir, "atom.xml"), buildAtom(posts));
}
