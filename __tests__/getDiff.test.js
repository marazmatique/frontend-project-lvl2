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
  ['.json', '.yml', '.ini'].forEach((extension) => {
    saveConfigFile(`${__dirname}/../__fixtures__/before.json`, extension);
    saveConfigFile(`${__dirname}/../__fixtures__/after.json`, extension);
  });
});

afterAll(() => {
  fs.rmdirSync(getFixturesPath(), { recursive: true });
});

test.each([
  ['plain', ['.json', '.yml', '.ini'], 'answer_plain'],
  ['total', ['.json', '.yml', '.ini'], 'answer_total'],
  ['json', ['.json', '.yml', '.ini'], 'answer.json'],
])('%s(%s)', (format, extensions, ans) => {
  extensions.forEach((ext) => {
    const pathBefore = `${__dirname}/../__fixtures__/testPlace/before${ext}`;
    const pathAfter = `${__dirname}/../__fixtures__/testPlace/after${ext}`;
    const answer = fs
      .readFileSync(`${__dirname}/../__fixtures__/${ans}`, 'utf8');

    expect(getDiff(pathBefore, pathAfter, format)).toEqual(answer);
  });
});
