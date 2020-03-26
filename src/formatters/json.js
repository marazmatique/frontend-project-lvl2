export default (ast) => {
  const iter = (arr) => arr.reduce((acc, node) => {
    if (node.state === 'deep') {
      acc[node.key] = iter(node.value);
      return acc;
    }

    acc[node.key] = node.state;

    return acc;
  }, {});

  return JSON.stringify(iter(ast), null, 2);
};
