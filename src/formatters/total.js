const isObject = (ele) => typeof ele === 'object';

const indent = (num) => ' '.repeat(num);

const stringify = (obj, gap) => `{\n${Object.entries(obj)
  .map(([key, value]) => `${indent(gap + 4)}${key}: ${value}`)
  .join('\n')}\n${indent(gap)}}`;

export default (ast) => {
  const iter = (arr, gap) => arr
    .reduce((acc, [key, status, oldValue, newValue]) => {
      const getDeep = (value) => {
        if (Array.isArray(value)) {
          return `{\n${iter(value, gap + 4).join('\n')}\n${indent(gap + 4)}}`;
        }
        if (isObject(value)) {
          return stringify(value, gap + 4);
        }

        return value;
      };

      if (status === 'changed') {
        acc.push(`${indent(gap)}  - ${key}: ${getDeep(oldValue)}`);
        acc.push(`${indent(gap)}  + ${key}: ${getDeep(newValue)}`);
        return acc;
      }

      acc.push(`${indent(gap)}  ${status} ${key}: ${getDeep(oldValue)}`);
      return acc;
    }, []);

  return `{\n${iter(ast, 0).join('\n')}\n}`;
};
