const formatValue = (value) => {
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
    .reduce((acc, [key, state, valueBefore, valueAfter]) => {
      const keyPath = preKey.length > 0 ? [preKey, key].join('.') : key;
      switch (state) {
        case ('deep'):
          acc.push(...iter(valueBefore, keyPath));
          return acc;
        case ('changed'):
          acc.push(`Property '${keyPath}' was changed from ${formatValue(valueBefore)} to ${formatValue(valueAfter)}`);
          return acc;
        case ('deleted'):
          acc.push(`Property '${keyPath}' was deleted`);
          return acc;
        case ('added'):
          acc.push(`Property '${keyPath}' was added with value: ${formatValue(valueAfter)}`);
          return acc;
        case ('equal'):
          return acc;
        default:
          throw new Error(`unknown state "${state}"`);
      }
    }, []);

  return iter(ast, []).join('\n');
};
