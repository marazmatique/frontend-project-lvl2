import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { inputParsers, outputParsers } from './parsers';

const isObject = (ele) => typeof ele === 'object';

const buildAst = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 });

  const makeNode = (key) => {
    const isHasObj1 = _.has(obj1, key);
    const isHasObj2 = _.has(obj2, key);

    const valueBefore = obj1[key];
    const valueAfter = obj2[key];

    let state;

    switch (true) {
      case (isHasObj1 && !isHasObj2):
        state = 'deleted';
        break;
      case (!isHasObj1 && isHasObj2):
        state = 'added';
        break;
      case (isObject(valueBefore) && isObject(valueAfter)):
        state = 'deep';
        return [key, state, buildAst(valueBefore, valueAfter)];
      case (valueBefore === valueAfter):
        state = 'equal';
        break;
      default:
        state = 'changed';
        break;
    }
    return [key, state, valueBefore, valueAfter];
  };

  return keys.map(makeNode);
};

export default (pathToConfigFile1, pathToConfigFile2, format = 'total') => {
  const config1 = fs.readFileSync(pathToConfigFile1, 'utf-8');
  const config2 = fs.readFileSync(pathToConfigFile2, 'utf-8');

  const extension1 = path.extname(pathToConfigFile1);
  const extension2 = path.extname(pathToConfigFile2);

  const obj1 = inputParsers[extension1](config1);
  const obj2 = inputParsers[extension2](config2);

  const ast = buildAst(obj1, obj2);

  return outputParsers[format](ast);
};
