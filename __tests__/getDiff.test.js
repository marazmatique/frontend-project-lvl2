import fs from 'fs';
import path from 'path';
import getDiff from '..';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['plain', ['.json', '.yml', '.ini'], 'answer_plain'],
  ['total', ['.json', '.yml', '.ini'], 'answer_total'],
  ['json', ['.json', '.yml', '.ini'], 'answer.json'],
])('%s(%s)', (format, extensions, answer) => {
  const expected = readFile(answer);

  extensions.forEach((ext) => {
    const before = getFixturePath(`before${ext}`);
    const after = getFixturePath(`after${ext}`);

    expect(getDiff(before, after, format)).toEqual(expected);
  });
});
