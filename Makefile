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

long_path:
	npx babel-node 'src/bin/gendiff.js' /Users/imac/Hexlet/frontend-project-lvl2/__fixtures__/before_havy.json /Users/imac/Hexlet/frontend-project-lvl2/__fixtures__/after_havy.json

short_path:
	npx babel-node 'src/bin/gendiff.js' ./__fixtures__/before_havy.json ./__fixtures__/after_havy.json

lint:
	npx eslint .

.PHONY: test