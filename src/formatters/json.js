export const isObject = (ele) => typeof ele === 'object' && ele !== null;

export const stringify = (obj) => Object.fromEntries(Object.entries(obj)
  .map(([key, value]) => [key, !/[^0-9]/.test(value) ? parseInt(value, 10) : value]));

export const diff = (ast) => {
  const iter = (arr) => {
    const acc = {};

    for (let i = 0; i < arr.length;) {
      const [key, status, value] = arr[i];
      const [nextKey, , nextValue] = arr[i + 1] || [null, null, null];

      if (Array.isArray(value)) {
        acc[key] = iter(value);
      }

      switch (true) {
        case (key === nextKey):
          acc[key] = ['was changed', value, nextValue];
          i += 2;
          break;
        case (status === '-'):
          acc[key] = 'was deleted';
          i += 1;
          break;
        case (status === '+'):
          acc[key] = ['was added with value', isObject(value) ? stringify(value) : value];
          i += 1;
          break;
        default:
          i += 1;
          break;
      }
    }

    return acc;
  };
  return JSON.stringify(iter(ast), null, 2);
};

export default diff;
