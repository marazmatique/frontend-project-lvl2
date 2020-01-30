import commander from 'commander';
import fs from 'fs';
import getDiff from './getDiff';

const gendiff = new commander.Command();
gendiff
  .version('0.0.1')
  .description('fdfdf')
  .option('-f, --format [style]', 'output format')
  .arguments('<before>')
  .arguments('<after>')
  .action((before, after) => {
    const beforePath = fs.readFileSync(before, 'utf8');
    const afterPath = fs.readFileSync(after, 'utf8');
    const diff = getDiff(beforePath, afterPath);
    console.log(diff);
  })
  .parse(process.argv);

export default gendiff;
