const exec = require('child_process').exec;
const chalk = require('chalk');
let ERROR = false

async function main() {
  await execute(`tslint --format stylish --force -p . -c tslint.json`);
  await execute(`stylelint ./src/**/*.scss`);
  console.log(chalk.hex("#F60")("ERROR:"), ERROR)
  if (ERROR) {
    process.exit(1);
  }
}

function execute(command) {
  return new Promise((resolve, reject) => {
    const child = exec(command,
      (error, stdout, stderr) => {
        if (stdout.includes('ERROR') || stdout.includes('✖')) {
          log(stdout);
          ERROR = true;
        }
        resolve(true);
      }
    )
  })
}

function log(text) {
  text = text.split("\n");
  text.forEach(textLine => {
    if (textLine.includes('ERROR') || textLine.includes('✖')) {
      console.log('  ', chalk.red(textLine))
    } else {
      console.log(chalk.green(textLine))
    }
  });
}

main();