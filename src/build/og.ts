import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const WIDTH = 1200;
const HEIGHT = 630;

const ACCENT = "#1f6feb";
const BG = "#0d1117";
const FG = "#f0f6fc";
const MUTED = "#8b949e";

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

interface PostMeta {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
}

function loadPosts(postsDir: string): PostMeta[] {
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
        title: fm.title ?? slug,
        subtitle: fm.subtitle ?? "",
        date: isoDate,
      };
    });
}

interface TemplateInput {
  title: string;
  subtitle: string;
  date: string;
  byline: string;
}

function template({ title, subtitle, date, byline }: TemplateInput) {
  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: BG,
        padding: "70px 80px",
        fontFamily: "Inter",
        color: FG,
      },
      children: [
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", gap: 18 },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 26,
                    color: ACCENT,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    fontWeight: 700,
                  },
                  children: "Blog post",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 18,
                    color: MUTED,
                  },
                  children: date,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              fontSize: title.length > 60 ? 64 : 76,
              fontWeight: 700,
              lineHeight: 1.1,
              color: FG,
            },
            children: title,
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 8,
            },
            children: [
              subtitle && {
                type: "div",
                props: {
                  style: {
                    fontSize: 28,
                    color: MUTED,
                    lineHeight: 1.3,
                  },
                  children: subtitle,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    fontSize: 26,
                    color: FG,
                    fontWeight: 700,
                    marginTop: 14,
                  },
                  children: byline,
                },
              },
            ].filter(Boolean),
          },
        },
      ],
    },
  };
}

export async function writeOgImages(opts: {
  postsDir: string;
  outDir: string;
  fontsDir: string;
  authorName: string;
}) {
  const regular = readFileSync(resolve(opts.fontsDir, "Inter-Regular.ttf"));
  const bold = readFileSync(resolve(opts.fontsDir, "Inter-Bold.ttf"));
  const fonts = [
    {
      name: "Inter",
      data: regular,
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Inter",
      data: bold,
      weight: 700 as const,
      style: "normal" as const,
    },
  ];

  const ogDir = resolve(opts.outDir, "og");
  mkdirSync(ogDir, { recursive: true });

  const posts = loadPosts(opts.postsDir);
  for (const post of posts) {
    const node = template({
      title: post.title,
      subtitle: post.subtitle,
      date: post.date,
      byline: opts.authorName,
    });
    // satori expects a JSX-like tree; the plain object shape works at runtime.
    const svg = await satori(node as unknown as React.ReactNode, {
      width: WIDTH,
      height: HEIGHT,
      fonts,
    });
    const png = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } })
      .render()
      .asPng();
    writeFileSync(resolve(ogDir, `${post.slug}.png`), png);
  }
}
