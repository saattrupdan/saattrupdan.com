#!/usr/bin/env -S uv run python
"""Reflow markdown to 88 characters, respecting frontmatter and code blocks."""
import sys
import textwrap

def reflow_markdown(filepath: str) -> None:
    with open(filepath, 'r') as f:
        lines = f.readlines()

    result = []
    in_frontmatter = False
    in_code_block = False

    for line in lines:
        stripped = line.rstrip()

        # Track frontmatter (--- at start/end)
        if stripped == '---' and not in_code_block:
            in_frontmatter = not in_frontmatter
            result.append(stripped)
            continue

        # Track code blocks
        if stripped.startswith('```'):
            in_code_block = not in_code_block
            result.append(stripped)
            continue

        # Pass through unchanged
        if in_frontmatter or in_code_block:
            result.append(stripped)
            continue

        # Skip short lines, URLs, headings, list items
        if (len(stripped) <= 88 or
            stripped.startswith('#') or
            stripped.startswith('- ') or
            stripped.startswith('>') or
            '://' in stripped or
            stripped.startswith('1.') or
            stripped.startswith('2.') or
            stripped.startswith('3.') or
            stripped.strip() == ''):
            result.append(stripped)
            continue

        # Wrap long prose lines
        wrapped = textwrap.fill(stripped, width=88, break_long_words=True)
        result.append(wrapped)

    with open(filepath, 'w') as f:
        f.write('\n'.join(result))

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <file.md>")
        sys.exit(1)
    reflow_markdown(sys.argv[1])
    print(f"Reflowed {sys.argv[1]} to 88 characters")
