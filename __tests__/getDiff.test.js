import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import getDiff from '../src/getDiff';
import { getData } from '../src/parsers';


const getFixturesPath = (name, ext) => path.format({
  root: './',
  dir: `${__dirname}/../__fixtures__/testPlace`,
  name,
  ext,
});

const makeConfig = {
  '.json': (data) => JSON.stringify(data, null, 2),
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

test.each(['.json', '.yml', '.ini'])('plain%s', (extension) => {
  const pathBefore = saveConfigFile(`${__dirname}/../__fixtures__/before.json`,
    extension);
  const pathAfter = saveConfigFile(`${__dirname}/../__fixtures__/after.json`,
    extension);

  const answer = fs
    .readFileSync(`${__dirname}/../__fixtures__/answer_plain`, 'utf8');

  expect(getDiff(pathBefore, pathAfter, 'plain')).toEqual(answer);
});

test.each(['.json', '.yml', '.ini'])('total%s', (extension) => {
  const pathBefore = saveConfigFile(`${__dirname}/../__fixtures__/before.json`,
    extension);
  const pathAfter = saveConfigFile(`${__dirname}/../__fixtures__/after.json`,
    extension);
  const answer = fs
    .readFileSync(`${__dirname}/../__fixtures__/answer_total`, 'utf8');

  expect(getDiff(pathBefore, pathAfter, 'total')).toEqual(answer);
});

test.each(['.json', '.yml', '.ini'])('json%s', (extension) => {
  const pathBefore = saveConfigFile(`${__dirname}/../__fixtures__/before.json`,
    extension);
  const pathAfter = saveConfigFile(`${__dirname}/../__fixtures__/after.json`,
    extension);
  const answer = fs
    .readFileSync(`${__dirname}/../__fixtures__/answer.json`, 'utf8');

  expect(getDiff(pathBefore, pathAfter, 'json')).toEqual(answer);
});
