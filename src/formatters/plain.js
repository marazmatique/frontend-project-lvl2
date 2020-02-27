export const isObject = (ele) => typeof ele === 'object';
const getFormated = (value) => {
  switch (typeof value) {
    case ('object'):
      return '[complex value]';
    case ('string'):
      return `'${value}'`;
    default:
      return value;
  }
};

export const diff = (ast) => {
  const iter = (arr, preKey) => arr
    .reduce((acc, [key, status, value, newValue]) => {
      const keyPath = preKey.length > 0 ? [preKey, key].join('.') : key;
      if (Array.isArray(value)) {
        acc.push(...iter(value, keyPath));
        return acc;
      }

      if (/[^ ]/.test(status)) {
        acc.push([keyPath, status, value, newValue]);
        return acc;
      }

      return acc;
    }, []);

  const changes = iter(ast, []);

  return changes.reduce((acc, [key, status, value, newValue]) => {
    switch (true) {
      case (status === 'changed'):
        acc.push(`Property '${key}' was changed from ${getFormated(value)} to ${getFormated(newValue)}`);
        return acc;
      case (status === '-'):
        acc.push(`Property '${key}' was deleted`);
        return acc;
      case (status === '+'):
        acc.push(`Property '${key}' was added with value: ${getFormated(value)}`);
        return acc;
      default:
        return acc;
    }
  }, []).join('\n');
};

export default diff;
