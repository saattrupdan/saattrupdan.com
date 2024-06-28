install:
	npm install

run:
	python3 generate_post_names.py && npm run dev

deploy:
	python3 generate_post_names.py && vercel --prod
