run:
	python3 generate_post_names.py && npm run dev

deploy:
	vercel --prod
