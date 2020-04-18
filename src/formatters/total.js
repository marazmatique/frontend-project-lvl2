import _ from 'lodash';

const indent = (num) => '    '.repeat(num);

const stringify = (strings, depth) => ['{', ...strings, '}'].join(`\n${indent(depth)}`);

const getDeep = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const propertyOfValue = Object.entries(value)
    .map(([deepKey, deepValue]) => `    ${deepKey}: ${deepValue}`);

  return stringify(propertyOfValue, depth);
};

const iter = (nodes, depth = 0) => {
  const result = nodes
    .map((node) => {
      switch (node.state) {
        case 'changed':
          return `  - ${node.key}: ${getDeep(node.valueBefore, depth + 1)}\n${indent(depth)}`
               + `  + ${node.key}: ${getDeep(node.valueAfter, depth + 1)}`;
        case 'immersed':
          return `    ${node.key}: ${iter(node.children, depth + 1)}`;
        case 'deleted':
          return `  - ${node.key}: ${getDeep(node.value, depth + 1)}`;
        case 'added':
          return `  + ${node.key}: ${getDeep(node.value, depth + 1)}`;
        case 'equal':
          return `    ${node.key}: ${getDeep(node.value, depth + 1)}`;
        default:
          throw new Error(`unknown state "${node.state}"`);
      }
    });

  return stringify(result, depth);
};

export default iter;
