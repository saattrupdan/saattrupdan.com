install:
	npm install

run:
	uv run src/backend/generate_post_names.py && npm run dev

deploy:
	uv run src/backend/generate_post_names.py && vercel --prod
