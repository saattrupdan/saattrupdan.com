"""Generate an Atom feed from blog post frontmatter."""

import subprocess
from datetime import datetime
from pathlib import Path

import yaml


def main() -> None:
    """Generate Atom feed from blog posts."""
    posts_dir = Path("src", "frontend", "posts")
    markdown_files = sorted(posts_dir.glob("*.md"), reverse=True)

    posts = []
    for file_path in markdown_files[:20]:
        frontmatter = parse_frontmatter(file_path)
        frontmatter["date_file_modified"] = file_path.stem
        posts.append(frontmatter)

    if not posts:
        raise RuntimeError("No valid posts found to generate feed")

    atom_content = generate_atom_feed(posts, base_url="https://saattrupdan.com")

    output_path = Path("public", "atom.xml")
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w") as f:
        f.write(atom_content)

    subprocess.run(["git", "add", str(output_path)])
    subprocess.run(["git", "commit", "-m", "Update Atom feed"])
    subprocess.run(["git", "push"])

    print(f"Generated Atom feed: {output_path}")


def parse_frontmatter(file_path: Path) -> dict[str, str]:
    """Parse frontmatter from a markdown file.

    Args:
        file_path: Path to the markdown file.

    Returns:
        Dictionary containing frontmatter fields.

    Raises:
        RuntimeError: If frontmatter parsing fails or file is invalid.
    """
    with file_path.open() as f:
        content = f.read()

    first_line = content.split("\n")[0]
    if first_line.strip() != "---":
        raise RuntimeError(f"File {file_path} does not have valid frontmatter")

    lines = content.split("\n")

    frontmatter_end = None
    for i, line in enumerate(lines[1:], start=1):
        if line.strip() == "---":
            frontmatter_end = i
            break
    if frontmatter_end is None:
        raise RuntimeError(
            f"File {file_path} does not have closing frontmatter delimiter"
        )

    frontmatter_content = "\n".join(lines[1:frontmatter_end])
    frontmatter = yaml.safe_load(frontmatter_content)
    if frontmatter is None:
        raise RuntimeError(f"File {file_path} has empty frontmatter")

    return frontmatter


def encode_rss_string(text: str) -> str:
    """Encode special characters for Atom XML.

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


def generate_atom_feed(posts: list[dict[str, str]], base_url: str) -> str:
    """Generate Atom feed XML from blog posts.

    Args:
        posts: List of post frontmatter dictionaries with date_file_modified.
        base_url: Base URL for the blog.

    Returns:
        Atom feed as XML string.
    """
    items = []
    for post in posts:
        title = encode_rss_string(post.get("title", "Untitled"))
        slug = post["date_file_modified"]
        link = f"{base_url}/posts/{slug}"

        # Extract date prefix from filename (format: YYYY-MM-DD-slug)
        pub_date_post = "-".join(slug.split("-")[:3])
        dt = datetime.strptime(pub_date_post, "%Y-%m-%d")
        pub_date_formatted = dt.strftime("%Y-%m-%dT%H:%M:%SZ")

        summary = ""
        if "meta" in post:
            summary = encode_rss_string(post["meta"])
        elif "description" in post:
            summary = encode_rss_string(post["description"])

        items.append(
            f"""    <entry>
      <title>{title}</title>
      <link href="{link}"/>
      <id>{link}</id>
      <published>{pub_date_formatted}</published>
      <summary>{summary}</summary>
    </entry>"""
        )

    items_xml = "\n".join(items)

    # Use the first post's date as the feed's updated date
    feed_updated = "-".join(posts[0]["date_file_modified"].split("-")[:3])
    dt = datetime.strptime(feed_updated, "%Y-%m-%d")
    feed_updated = dt.strftime("%Y-%m-%dT%H:%M:%SZ")

    atom = f'''<?xml version="1.0" encoding="UTF-8" ?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Dan Saattrup Smart</title>
  <link href="{base_url}"/>
  <link href="{base_url}/atom.xml" rel="self"/>
  <subtitle>Blog posts by Dan Saattrup Smart</subtitle>
  <updated>{feed_updated}</updated>
  <id>{base_url}</id>
{items_xml}
</feed>'''
    return atom


if __name__ == "__main__":
    main()
