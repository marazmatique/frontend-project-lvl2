const normalize = (value) => (!/[^0-9]/.test(value) ? parseInt(value, 10) : value);

export default (ast) => JSON.stringify(ast, (key, value) => normalize(value), 2);
