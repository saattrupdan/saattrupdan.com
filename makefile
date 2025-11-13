install:
	@npm install

run:
	@make generate_post_names && npm run dev

deploy:
	@make generate_post_names && vercel --prod

generate_post_names:
	@uv run src/backend/generate_post_names.py \
		&& git add src/frontend/posts/postNames.ts \
		&& npm run lint
