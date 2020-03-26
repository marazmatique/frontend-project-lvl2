import _ from 'lodash';

const indent = (num) => ' '.repeat(num);

const stringify = (obj, gap) => `{\n${Object.entries(obj)
  .map(([key, value]) => `${indent(gap + 4)}${key}: ${value}`)
  .join('\n')}\n${indent(gap)}}`;

export default (ast) => {
  const iter = (arr, gap) => arr
    .reduce((acc, node) => {
      const getDeep = (value) => {
        if (Array.isArray(value)) {
          return `{\n${iter(value, gap + 4).join('\n')}\n${indent(gap + 4)}}`;
        }
        if (_.isObject(value)) {
          return stringify(value, gap + 4);
        }
        return value;
      };

      switch (node.state) {
        case ('changed'):
          acc.push(`${indent(gap)}  - ${node.key}: ${getDeep(node.value.valueBefore)}`);
          acc.push(`${indent(gap)}  + ${node.key}: ${getDeep(node.value.valueAfter)}`);
          break;
        case ('deep'):
          acc.push(`${indent(gap)}    ${node.key}: ${getDeep(node.value)}`);
          break;
        case ('deleted'):
          acc.push(`${indent(gap)}  - ${node.key}: ${getDeep(node.value)}`);
          break;
        case ('added'):
          acc.push(`${indent(gap)}  + ${node.key}: ${getDeep(node.value)}`);
          break;
        case ('equal'):
          acc.push(`${indent(gap)}    ${node.key}: ${getDeep(node.value)}`);
          break;
        default:
          throw new Error(`unknown state "${node.state}"`);
      }
      return acc;
    }, []);

  return `{\n${iter(ast, 0).join('\n')}\n}`;
};
