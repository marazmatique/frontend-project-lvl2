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
    .reduce((acc, [key, value]) => {
      const keyPath = preKey.length > 0 ? [preKey, key.slice(4)].join('.') : key.slice(4);
      if (Array.isArray(value)) {
        acc.push(...iter(value, keyPath));
        return acc;
      }

      if (/[-+]/.test(key[2])) {
        acc.push([keyPath, key[2], value]);
        return acc;
      }

      return acc;
    }, []);

  const changes = iter(ast, []);
  const answer = [];

  for (let i = 0; i < changes.length;) {
    const [currentKey, currentOperand, currentValue] = changes[i];
    const [nextKey, , nextValue] = changes[i + 1] || [null, null, null];
    switch (true) {
      case (currentKey === nextKey):
        answer.push(`Property '${currentKey}' was changed from ${getFormated(currentValue)} to ${getFormated(nextValue)}`);
        i += 2;
        break;
      case (currentOperand === '-'):
        answer.push(`Property '${currentKey}' was deleted`);
        i += 1;
        break;
      case (currentOperand === '+'):
        answer.push(`Property '${currentKey}' was added with value: ${getFormated(currentValue)}`);
        i += 1;
        break;
      default:
        answer.push(null);
    }
  }

  return answer.join('\n');
};

export default diff;
