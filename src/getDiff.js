import _ from 'lodash';
import { getData } from './parsers';

const isObject = (ele) => typeof ele === 'object' && ele !== null;

const indent = (num) => ' '.repeat(num);

const buildAst = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 });
  return keys.reduce((acc, key) => {
    const before = obj1[key];
    const after = obj2[key];

    if (isObject(before) && isObject(after)) {
      acc.push([`    ${key}`, buildAst(before, after)]);
      return acc;
    }
    if (before === after) {
      acc.push([`    ${key}`, before]);
      return acc;
    }
    if (_.has(obj1, key) && before !== after) {
      acc.push([`  - ${key}`, before]);
    }
    if (_.has(obj2, key) && before !== after) {
      acc.push([`  + ${key}`, after]);
    }

    return acc;
  }, []);
};

const stringify = (obj, gap) => `{\n${Object.entries(obj)
  .map(([key, value]) => `${indent(gap + 4)}${key}: ${value}`)
  .join('\n')}\n${indent(gap)}}`;

const diff = (ast, gap = 0) => {
  const answer = ast.map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${indent(gap)}${key}: ${diff(value, gap + 4)}`;
    }

    if (isObject(value)) {
      return `${indent(gap)}${key}: ${stringify(value, gap + 4)}`;
    }

    return `${indent(gap)}${key}: ${value}`;
  });

  return `{\n${answer.join('\n')}\n${indent(gap)}}`;
};

export default (pathToConfigFile1, pathToConfigFile2) => {
  const obj1 = getData(pathToConfigFile1);
  const obj2 = getData(pathToConfigFile2);
  const ast = buildAst(obj1, obj2);
  return diff(ast);
};
