const isNumber = (value) => !/[^0-9]/.test(value);

export default (ast) => JSON.stringify(ast, (key, value) => {
  if (!isNumber(value)) {
    return value;
  }

  return parseInt(value, 10);
}, 2);
