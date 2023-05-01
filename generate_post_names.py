"""Generate a list of post names from a directory of markdown files."""

from pathlib import Path


def main() -> None:
    """Generate a list of post names from a directory of markdown files."""

    posts_dir = Path('src') / 'posts'
    post_names = [post.stem for post in posts_dir.glob('*.md')]

    # Sort post names by date in descending order
    post_dates = [post_name.split('-')[:3] for post_name in post_names]
    post_names = sorted(
        post_names, key=lambda x: post_dates[post_names.index(x)], reverse=True
    )

    # Store post names in a JavaScript array
    output_path = posts_dir / 'postNames.js'
    with output_path.open('w') as output_file:
        output_file.write(f'export default {post_names}')


if __name__ == '__main__':
    main()
