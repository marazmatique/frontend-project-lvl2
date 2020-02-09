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
      console.log(getDiff(before, after));
    })
    .parse(process.argv);

  return gendiff;
};
