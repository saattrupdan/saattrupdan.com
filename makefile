install:
	@npm install

run:
	@npm run dev

generate_rss:
	@uv run src/backend/generate_rss.py

deploy: generate_rss
	@git add public/atom.xml
	@git diff --cached --quiet public/atom.xml || git commit -m "Update Atom feed"
	@git push
	@vercel --prod
