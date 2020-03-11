#!/usr/bin/env node

import commander from 'commander';
import getDiff from 'frontend-project-lvl2';

const gendiff = () => new commander.Command()
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [format]', 'write format options', 'total')
  .arguments('<before> <after>')
  .action((before, after, options) => console.log(getDiff(before, after, options.format)))
  .parse(process.argv);

gendiff();
