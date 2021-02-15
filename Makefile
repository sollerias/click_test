install: install-deps

install-deps:
	npm ci

run:
	rm -rf dist
	npm run build

build:
	rm -rf dist
	npm run build

dev:
	rm -rf dist
	npm run dev

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test
