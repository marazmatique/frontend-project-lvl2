import _ from 'lodash';

export default (ast) => {
  const iter = (arr) => arr.reduce((acc, node) => {
    if (_.has(node, 'children')) {
      acc[node.key] = iter(node.children);
      return acc;
    }

    acc[node.key] = node.state;

    return acc;
  }, {});

  return JSON.stringify(iter(ast), null, 2);
};
