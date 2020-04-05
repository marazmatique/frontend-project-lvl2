import _ from 'lodash';

const indent = (num) => ' '.repeat(num);

const stringify = (strings, gap) => ['{', ...strings, '}'].join(`\n${indent(gap)}`);

const getDeep = (value, gap) => {
  if (_.isObject(value)) {
    const propertyOfValue = Object.entries(value)
      .map(([deepKey, deepValue]) => `    ${deepKey}: ${deepValue}`);
    return stringify(propertyOfValue, gap + 4);
  }

  return value;
};

const iter = (nodes, gap = 0) => {
  const result = nodes
    .map((node) => {
      switch (node.state) {
        case 'changed':
          return `  - ${node.key}: ${getDeep(node.valueBefore, gap)}\n${indent(gap)}`
               + `  + ${node.key}: ${getDeep(node.valueAfter, gap)}`;
        case 'immersed':
          return `    ${node.key}: ${iter(node.children, gap + 4)}`;
        case 'deleted':
          return `  - ${node.key}: ${getDeep(node.value, gap)}`;
        case 'added':
          return `  + ${node.key}: ${getDeep(node.value, gap)}`;
        case 'equal':
          return `    ${node.key}: ${getDeep(node.value, gap)}`;
        default:
          throw new Error(`unknown state "${node.state}"`);
      }
    });

  return stringify(result, gap);
};

export default iter;
