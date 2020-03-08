const isObject = (ele) => typeof ele === 'object';

const stringify = (obj) => Object.fromEntries(Object.entries(obj)
  .map(([key, value]) => [key, !/[^0-9]/.test(value) ? parseInt(value, 10) : value]));

export default (ast) => {
  const iter = (arr) => arr
    .reduce((acc, [key, state, valueBefore, valueAfter]) => {
      switch (state) {
        case ('deep'):
          acc[key] = iter(valueBefore);
          return acc;
        case ('changed'):
          acc[key] = ['was changed', valueBefore, valueAfter];
          return acc;
        case ('deleted'):
          acc[key] = 'was deleted';
          return acc;
        case ('added'):
          acc[key] = ['was added with value', isObject(valueAfter) ? stringify(valueAfter) : valueAfter];
          return acc;
        case ('equal'):
          return acc;
        default:
          throw new Error(`unknown state "${state}"`);
      }
    }, {});

  return JSON.stringify(iter(ast), null, 2);
};
