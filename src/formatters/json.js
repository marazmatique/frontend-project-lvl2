export default (ast) => {
  const iter = (arr) => Object.fromEntries(arr
    .map((node) => [node.key, node.children ? iter(node.children) : node.state]));

  return JSON.stringify(iter(ast), null, 2);
};
