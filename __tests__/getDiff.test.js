import fs from 'fs';
import getDiff from '../src';

test.each([
  ['plain', ['.json', '.yml', '.ini'], 'answer_plain'],
  ['total', ['.json', '.yml', '.ini'], 'answer_total'],
  ['json', ['.json', '.yml', '.ini'], 'answer.json'],
])('%s(%s)', (format, extensions, ans) => {
  extensions.forEach((ext) => {
    const before = `${__dirname}/../__fixtures__/before${ext}`;
    const after = `${__dirname}/../__fixtures__/after${ext}`;
    const answer = fs
      .readFileSync(`${__dirname}/../__fixtures__/${ans}`, 'utf8');

    expect(getDiff(before, after, format)).toEqual(answer);
  });
});
