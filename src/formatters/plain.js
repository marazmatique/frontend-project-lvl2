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
    .reduce((acc, node) => {
      const keyPath = preKey.length > 0 ? [preKey, node.key].join('.') : node.key;
      switch (node.state) {
        case ('deep'):
          acc.push(...iter(node.children, keyPath));
          return acc;
        case ('changed'):
          acc.push(`Property '${keyPath}' was changed from ${formatValue(node.valueBefore)} to ${formatValue(node.valueAfter)}`);
          return acc;
        case ('deleted'):
          acc.push(`Property '${keyPath}' was deleted`);
          return acc;
        case ('added'):
          acc.push(`Property '${keyPath}' was added with value: ${formatValue(node.value)}`);
          return acc;
        case ('equal'):
          return acc;
        default:
          throw new Error(`unknown state "${node.state}"`);
      }
    }, []);

  return iter(ast, []).join('\n');
};
