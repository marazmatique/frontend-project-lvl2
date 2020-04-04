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

const iter = (nodes, accumulatedPath) => nodes
  .map((node) => {
    const pathToKey = accumulatedPath ? [accumulatedPath, node.key].join('.') : node.key;

    switch (node.state) {
      case 'immersed':
        return iter(node.children, pathToKey);
      case 'changed':
        return `Property '${pathToKey}' was changed from ${formatValue(node
          .valueBefore)} to ${formatValue(node.valueAfter)}`;
      case 'deleted':
        return `Property '${pathToKey}' was deleted`;
      case 'added':
        return `Property '${pathToKey}' was added with value: ${formatValue(node.value)}`;
      case 'equal':
        return null;
      default:
        throw new Error(`unknown state "${node.state}"`);
    }
  })
  .filter((str) => str !== null)
  .join('\n');

export default (ast) => iter(ast);
