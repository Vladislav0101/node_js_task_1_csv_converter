const handleLineArgumentErrors = require("./handleLineArgumentErrors");

const necessaryArguments = ["sourceFile", "resultFile", "separator"];

function getArguments() {
  const argv = require("minimist")(process.argv.slice(2));

  try {
    handleLineArgumentErrors(argv, necessaryArguments);
  } catch (err) {
    console.error(err);
    return;
  }

  return {
    sourceFile: argv.sourceFile,
    resultFile: argv.resultFile,
    separator: argv.separator,
  };
}

module.exports = getArguments;
