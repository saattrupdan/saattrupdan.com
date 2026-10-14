install:
	@npm install

run:
	@npm run dev

generate_rss:
	@uv run src/backend/generate_rss.py
