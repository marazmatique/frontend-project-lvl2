import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import getDiff from '../src/getDiff';
import { getData } from '../src/parsers';


const getFixturesPath = (name, ext) => path.format({
  root: '/',
  dir: '/Users/imac/Hexlet/frontend-project-lvl2/__fixtures__/testPlace',
  name,
  ext,
});

const makeConfig = {
  '.json': (data) => JSON.stringify(data),
  '.yml': (data) => yaml.dump(data),
  '.ini': (data) => ini.encode(data),
};

const saveConfigFile = (pathToPrototype, ext) => {
  const { name } = path.parse(pathToPrototype);
  const configData = makeConfig[ext](getData(pathToPrototype));
  const pathToConfig = getFixturesPath(name, ext);
  fs.writeFileSync(pathToConfig, configData);

  return pathToConfig;
};

beforeAll(() => {
  fs.mkdirSync(getFixturesPath());
});

afterAll(() => {
  fs.rmdirSync(getFixturesPath(), { recursive: true });
});

test.each(['.json', '.yml', '.ini'])('simple%s', (extension) => {
  const pathBefore = saveConfigFile('/Users/imac/Hexlet/frontend-project-lvl2/__fixtures__/before.json',
    extension);
  const pathAfter = saveConfigFile('/Users/imac/Hexlet/frontend-project-lvl2/__fixtures__/after.json',
    extension);

  const answer = fs
    .readFileSync('/Users/imac/Hexlet/frontend-project-lvl2/__fixtures__/answer_simple', 'utf8');

  expect(getDiff(pathBefore, pathAfter)).toEqual(answer);
});

test.each(['.json', '.yml', '.ini'])('complicated%s', (extension) => {
  const pathBefore = saveConfigFile('/Users/imac/Hexlet/frontend-project-lvl2/__fixtures__/before_havy.json',
    extension);
  const pathAfter = saveConfigFile('/Users/imac/Hexlet/frontend-project-lvl2/__fixtures__/after_havy.json',
    extension);

  const answer = fs
    .readFileSync('/Users/imac/Hexlet/frontend-project-lvl2/__fixtures__/answer_complicated', 'utf8');

  expect(getDiff(pathBefore, pathAfter)).toEqual(answer);
});
