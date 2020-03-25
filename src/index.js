import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './formatters';

const buildAst = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const makeNode = (key) => {
    const isHasObj1 = _.has(obj1, key);
    const isHasObj2 = _.has(obj2, key);
    const valueBefore = obj1[key];
    const valueAfter = obj2[key];

    if (isHasObj1 && !isHasObj2) {
      return { key, state: 'deleted', value: valueBefore };
    }
    if (!isHasObj1 && isHasObj2) {
      return { key, state: 'added', value: valueAfter };
    }
    if (_.isObject(valueBefore) && _.isObject(valueAfter)) {
      return { key, state: 'deep', children: buildAst(valueBefore, valueAfter) };
    }
    if (valueBefore === valueAfter) {
      return { key, state: 'equal', value: valueBefore };
    }
    if (valueBefore !== valueAfter) {
      return { key, state: 'changed', valueBefore, valueAfter };
    }

    throw new Error(`state error with key: ${key}`);
  };

  return keys.map(makeNode);
};

export default (pathToConfigFile1, pathToConfigFile2, format = 'total') => {
  const config1 = fs.readFileSync(pathToConfigFile1, 'utf-8');
  const config2 = fs.readFileSync(pathToConfigFile2, 'utf-8');

  const extname1 = path.extname(pathToConfigFile1);
  const extname2 = path.extname(pathToConfigFile2);

  const configType = (extname) => extname.slice(1);

  const obj1 = parse(config1, configType(extname1));
  const obj2 = parse(config2, configType(extname2));

  const ast = buildAst(obj1, obj2);

  return render(ast, format);
};
