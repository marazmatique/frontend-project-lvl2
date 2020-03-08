import yaml from 'js-yaml';
import ini from 'ini';
import totalDiff from './formatters/total';
import plainDiff from './formatters/plain';
import jsonDiff from './formatters/json';

export const inputParsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export const outputParsers = {
  total: totalDiff,
  plain: plainDiff,
  json: jsonDiff,
};
