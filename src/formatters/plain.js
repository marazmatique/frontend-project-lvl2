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

export default (ast) => {
  const iter = (arr, preKey) => arr
    .reduce((acc, [key, status, value, newValue]) => {
      const keyPath = preKey.length > 0 ? [preKey, key].join('.') : key;
      switch (true) {
        case (Array.isArray(value)):
          acc.push(...iter(value, keyPath));
          return acc;
        case (status === 'changed'):
          acc.push(`Property '${keyPath}' was changed from ${getFormated(value)} to ${getFormated(newValue)}`);
          return acc;
        case (status === '-'):
          acc.push(`Property '${keyPath}' was deleted`);
          return acc;
        case (status === '+'):
          acc.push(`Property '${keyPath}' was added with value: ${getFormated(value)}`);
          return acc;
        default:
          return acc;
      }
    }, []);

  return iter(ast, []).join('\n');
};
