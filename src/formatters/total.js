const isObject = (ele) => typeof ele === 'object';

const indent = (num) => ' '.repeat(num);

const stringify = (obj, gap) => `{\n${Object.entries(obj)
  .map(([key, value]) => `${indent(gap + 4)}${key}: ${value}`)
  .join('\n')}\n${indent(gap)}}`;

export default (ast) => {
  const iter = (arr, gap) => arr
    .reduce((acc, [key, state, valueBefore, valueAfter]) => {
      const getDeep = (value) => {
        if (Array.isArray(value)) {
          return `{\n${iter(value, gap + 4).join('\n')}\n${indent(gap + 4)}}`;
        }
        if (isObject(value)) {
          return stringify(value, gap + 4);
        }

        return value;
      };

      switch (state) {
        case ('changed'):
          acc.push(`${indent(gap)}  - ${key}: ${getDeep(valueBefore)}`);
          acc.push(`${indent(gap)}  + ${key}: ${getDeep(valueAfter)}`);
          return acc;
        case ('deep'):
          acc.push(`${indent(gap)}    ${key}: ${getDeep(valueBefore)}`);
          return acc;
        case ('deleted'):
          acc.push(`${indent(gap)}  - ${key}: ${getDeep(valueBefore)}`);
          return acc;
        case ('added'):
          acc.push(`${indent(gap)}  + ${key}: ${getDeep(valueAfter)}`);
          return acc;
        case ('equal'):
          acc.push(`${indent(gap)}    ${key}: ${getDeep(valueBefore)}`);
          return acc;
        default:
          throw new Error(`unknown state "${state}"`);
      }
    }, []);

  return `{\n${iter(ast, 0).join('\n')}\n}`;
};
