const chalk = require('chalk');

console.log(process.stdout.isTTY);
console.log('%s Hi there', chalk.cyan('INFO'));
