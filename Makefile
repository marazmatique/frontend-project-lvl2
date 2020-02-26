install:
	npm install

install-deps:
	npm ci

build:
	rm -rf dist
	npm run build

h:
	npx babel-node 'src/bin/gendiff.js' -h

V:
	npx babel-node 'src/bin/gendiff.js' --version

publish:
	npm publish

test:
	npm test

test-coverage:
	npm jest --coverage

plain:
	npx babel-node 'src/bin/gendiff.js' -f plain /Users/imac/Hexlet/frontend-project-lvl2/__fixtures__/before.json /Users/imac/Hexlet/frontend-project-lvl2/__fixtures__/after.json

short:
	npx babel-node 'src/bin/gendiff.js' ./__fixtures__/before.json ./__fixtures__/after.json

json:
	npx babel-node 'src/bin/gendiff.js' -f json /Users/imac/Hexlet/frontend-project-lvl2/__fixtures__/before.json /Users/imac/Hexlet/frontend-project-lvl2/__fixtures__/after.json

total:
	npx babel-node 'src/bin/gendiff.js' -f total /Users/imac/Hexlet/frontend-project-lvl2/__fixtures__/before.json /Users/imac/Hexlet/frontend-project-lvl2/__fixtures__/after.json

lint:
	npx eslint .

.PHONY: test