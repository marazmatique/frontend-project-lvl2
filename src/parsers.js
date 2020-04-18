import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const isNumber = (value) => !/[^0-9]/.test(value);

const digitize = (obj) => Object.fromEntries(Object.entries(obj)
  .map(([key, value]) => {
    if (_.isObject(value)) {
      return [key, digitize(value)];
    }

    return [key, isNumber(value) ? parseInt(value, 10) : value];
  }));

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: (config) => digitize(ini.parse(config)),
};

export default (config, type) => parsers[type](config);
