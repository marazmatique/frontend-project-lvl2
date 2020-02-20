import commander from 'commander';
import getDiff from './getDiff';

export default () => {
  const gendiff = new commander.Command();

  gendiff
    .version('0.0.1')
    .description('fdfdf')
    .option('-f, --format [format]', 'write format options', 'total')
    .arguments('<before> <after>')
    .action((before, after, options) => console.log(getDiff(before, after, options.format)))
    .parse(process.argv);
};
