import totalDiff from './total';
import plainDiff from './plain';
import jsonDiff from './json';

const outputFormat = ({
  total: totalDiff,
  plain: plainDiff,
  json: jsonDiff,
});

export default (ast, format) => outputFormat[format](ast);
