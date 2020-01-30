install:
	npm install

h:
	npx babel-node 'src/bin/gendiff.js' -h

V:
	npx babel-node 'src/bin/gendiff.js' --version

publish:
	npm publish --dry-run

test:
	npm test

run:
	npx babel-node 'src/bin/gendiff.js' /Users/imac/Hexlet/frontend-project-lvl2/__tests__/fixtures/before.json /Users/imac/Hexlet/frontend-project-lvl2/__tests__/fixtures/after.json

runn:
	npx babel-node 'src/bin/gendiff.js' ./__tests__/fixtures/before.json ./__tests__/fixtures/after.json

lint:
	npx eslint .

.PHONY: test