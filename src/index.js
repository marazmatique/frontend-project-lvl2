import commander from 'commander';
import getDiff from './getDiff';

export default () => {
  const gendiff = new commander.Command();

  gendiff
    .version('0.0.1')
    .description('fdfdf')
    .option('-f, --format [style]', 'output format')
    .arguments('<before>')
    .arguments('<after>')
    .action((before, after) => {
      const diff = getDiff(before, after);
      console.log(diff);
    })
    .parse(process.argv);

  return gendiff;
};
