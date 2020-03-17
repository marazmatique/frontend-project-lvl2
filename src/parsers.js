import yaml from 'js-yaml';
import ini from 'ini';

export default (configData) => {
  if (/^[{\t}]/m.test(configData)) {
    return JSON.parse(configData);
  }
  if (/:/m.test(configData)) {
    return yaml.safeLoad(configData);
  }
  if (/^[^\t]/m.test(configData)) {
    return ini.parse(configData);
  }

  throw new Error(`unsupported type of configData: ${configData}`);
};
