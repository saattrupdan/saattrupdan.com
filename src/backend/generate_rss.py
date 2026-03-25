"""Generate an RSS feed from blog post frontmatter."""

import subprocess
from datetime import datetime, timezone
from pathlib import Path

import yaml


def parse_frontmatter(file_path: Path) -> dict[str, str] | None:
    """Parse frontmatter from a markdown file.

    Args:
        file_path: Path to the markdown file.

    Returns:
        Dictionary containing frontmatter fields, or None if parsing fails.
    """
    try:
        with file_path.open() as f:
            content = f.read()
        first_line = content.split("\n")[0]
        if first_line.strip() != "---":
            return None
        lines = content.split("\n")
        frontmatter_end = None
        for i, line in enumerate(lines[1:], start=1):
            if line.strip() == "---":
                frontmatter_end = i
                break
        if frontmatter_end is None:
            return None
        frontmatter_content = "\n".join(lines[1:frontmatter_end])
        return yaml.safe_load(frontmatter_content)
    except (OSError, yaml.YAMLError):
        return None


def encode_rss_string(text: str) -> str:
    """Encode special characters for RSS XML.

    Args:
        text: The text to encode.

    Returns:
        XML-safe string with special characters escaped.
    """
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
        .replace("'", "&apos;")
    )


def generate_rss(posts: list[dict[str, str]], base_url: str) -> str:
    """Generate RSS feed XML from blog posts.

    Args:
        posts: List of post frontmatter dictionaries with date_file_modified.
        base_url: Base URL for the blog.

    Returns:
        RSS feed as XML string.
    """
    pub_date = datetime.now(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S %z")

    items = []
    for post in posts:
        title = encode_rss_string(post.get("title", "Untitled"))
        slug = post["date_file_modified"]
        link = f"{base_url}/posts/{slug}"
        pub_date_post = post.get("date_file_modified")
        if pub_date_post:
            try:
                dt = datetime.strptime(pub_date_post, "%Y-%m-%d")
                pub_date_formatted = dt.strftime("%a, %d %b %Y %H:%M:%S %z")
            except ValueError:
                pub_date_formatted = pub_date
        else:
            pub_date_formatted = pub_date

        description = ""
        if "meta" in post:
            description = encode_rss_string(post["meta"])
        elif "description" in post:
            description = encode_rss_string(post["description"])

        items.append(
            f"""    <item>
      <title>{title}</title>
      <link>{link}</link>
      <description>{description}</description>
      <pubDate>{pub_date_formatted}</pubDate>
      <guid>{link}</guid>
    </item>"""
        )

    items_xml = "\n".join(items)

    rss = f'''<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Dan Saattrup Smart</title>
    <link>{base_url}</link>
    <description>Blog posts by Dan Saattrup Smart</description>
    <atom:link href="{base_url}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-gb</language>
    <lastBuildDate>{pub_date}</lastBuildDate>
{items_xml}
  </channel>
</rss>'''
    return rss


def main() -> None:
    """Generate RSS feed from blog posts."""
    posts_dir = Path("src", "frontend", "posts")
    markdown_files = sorted(posts_dir.glob("*.md"), reverse=True)

    posts = []
    for file_path in markdown_files[:20]:
        frontmatter = parse_frontmatter(file_path)
        if frontmatter:
            frontmatter["date_file_modified"] = file_path.stem
            posts.append(frontmatter)

    rss_content = generate_rss(posts, base_url="https://saattrupdan.com")

    output_path = Path("public", "rss.xml")
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w") as f:
        f.write(rss_content)

    subprocess.run(["git", "add", str(output_path)])
    subprocess.run(["git", "commit", "-m", "Update RSS feed"])
    subprocess.run(["git", "push"])

    print(f"Generated RSS feed: {output_path}")


if __name__ == "__main__":
    main()
