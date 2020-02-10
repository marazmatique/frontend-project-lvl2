import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import path from 'path';


export const makeData = {
  '.json': (data) => JSON.parse(data),
  '.yml': (data) => yaml.safeLoad(data),
  '.ini': (data) => ini.parse(data),
};

export const getData = (configFilePath) => {
  const extension = path.extname(configFilePath);

  const data = fs.readFileSync(configFilePath, 'utf8');

  return makeData[extension](data);
};
