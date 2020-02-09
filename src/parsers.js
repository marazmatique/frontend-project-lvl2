import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import path from 'path';


const parser = {
  '.json': (data) => JSON.parse(data),
  '.yml': (data) => yaml.safeLoad(data),
  '.ini': (data) => ini.parse(data),
};

export default (configFilePath) => {
  const fileType = path.extname(configFilePath);

  const configFile = fs.readFileSync(configFilePath, 'utf8');

  return parser[fileType](configFile);
};
