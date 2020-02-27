export const isObject = (ele) => typeof ele === 'object';

export const indent = (num) => ' '.repeat(num);

export const stringify = (obj, gap) => `{\n${Object.entries(obj)
  .map(([key, value]) => `${indent(gap + 4)}${key}: ${value}`)
  .join('\n')}\n${indent(gap)}}`;

export const diff = (ast, gap = 0) => {
  const getDeep = (value) => {
    if (Array.isArray(value)) {
      return diff(value, gap + 4);
    }
    if (isObject(value)) {
      return stringify(value, gap + 4);
    }

    return value;
  };

  const answer = ast.map(([key, status, oldValue, newValue]) => {
    if (status === 'changed') {
      return `${indent(gap)}  - ${key}: ${getDeep(oldValue)}\n${indent(gap)}  + ${key}: ${getDeep(newValue)}`;
    }

    return `${indent(gap)}  ${status} ${key}: ${getDeep(oldValue)}`;
  });

  return `{\n${answer.join('\n')}\n${indent(gap)}}`;
};

export default diff;
