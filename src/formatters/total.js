export const isObject = (ele) => typeof ele === 'object' && ele !== null;

export const indent = (num) => ' '.repeat(num);

export const stringify = (obj, gap) => `{\n${Object.entries(obj)
  .map(([key, value]) => `${indent(gap + 4)}${key}: ${value}`)
  .join('\n')}\n${indent(gap)}}`;

export const diff = (ast, gap = 0) => {
  const answer = ast.map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${indent(gap)}${key}: ${diff(value, gap + 4)}`;
    }

    if (isObject(value)) {
      return `${indent(gap)}${key}: ${stringify(value, gap + 4)}`;
    }

    return `${indent(gap)}${key}: ${value}`;
  });

  return `{\n${answer.join('\n')}\n${indent(gap)}}`;
};

export default diff;
