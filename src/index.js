import _ from 'lodash';
import getData from './parsers';
import totalDiff from './formatters/total';
import plainDiff from './formatters/plain';
import jsonDiff from './formatters/json';

export const isObject = (ele) => typeof ele === 'object' && ele !== null;

const buildAst = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 });
  return keys.reduce((acc, key) => {
    const before = obj1[key];
    const after = obj2[key];

    if (isObject(before) && isObject(after)) {
      acc.push([key, ' ', buildAst(before, after)]);
      return acc;
    }
    if (before === after) {
      acc.push([key, ' ', before]);
      return acc;
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      acc.push([key, 'changed', before, after]);
      return acc;
    }
    if (_.has(obj1, key)) {
      acc.push([key, '-', before]);
    }
    if (_.has(obj2, key)) {
      acc.push([key, '+', after]);
    }

    return acc;
  }, []);
};

const outputFormat = {
  total: (ast) => totalDiff(ast),
  plain: (ast) => plainDiff(ast),
  json: (ast) => jsonDiff(ast),
};

export default (pathToConfigFile1, pathToConfigFile2, format) => {
  const obj1 = getData(pathToConfigFile1);
  const obj2 = getData(pathToConfigFile2);
  const ast = buildAst(obj1, obj2);
  return outputFormat[format](ast);
};
