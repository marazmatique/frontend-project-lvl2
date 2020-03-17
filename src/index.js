import _ from 'lodash';
import fs from 'fs';
import parse from './parsers';
import totalDiff from './formatters/total';
import plainDiff from './formatters/plain';
import jsonDiff from './formatters/json';

const buildAst = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const makeNode = (key) => {
    const isHasObj1 = _.has(obj1, key);
    const isHasObj2 = _.has(obj2, key);
    const valueBefore = obj1[key];
    const valueAfter = obj2[key];

    if (isHasObj1 && !isHasObj2) {
      return [key, 'deleted', valueBefore, valueAfter];
    }
    if (!isHasObj1 && isHasObj2) {
      return [key, 'added', valueBefore, valueAfter];
    }
    if (_.isObject(valueBefore) && _.isObject(valueAfter)) {
      return [key, 'deep', buildAst(valueBefore, valueAfter)];
    }
    if (valueBefore === valueAfter) {
      return [key, 'equal', valueBefore, valueAfter];
    }
    if (valueBefore !== valueAfter) {
      return [key, 'changed', valueBefore, valueAfter];
    }
    throw new Error(`I can not compare valueBefore: ${valueBefore} and valueAfter: ${valueAfter}`);
  };

  return keys.map(makeNode);
};

const outputFormat = {
  total: totalDiff,
  plain: plainDiff,
  json: jsonDiff,
};

export default (pathToConfigFile1, pathToConfigFile2, format = 'total') => {
  const config1 = fs.readFileSync(pathToConfigFile1, 'utf-8');
  const config2 = fs.readFileSync(pathToConfigFile2, 'utf-8');

  const obj1 = parse(config1);
  const obj2 = parse(config2);

  const ast = buildAst(obj1, obj2);

  return outputFormat[format](ast);
};
