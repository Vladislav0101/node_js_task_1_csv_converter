function getArguments() {
  const argv = require("minimist")(process.argv.slice(2));

  return {
    sourceFile: argv.sourceFile,
    resultFile: argv.resultFile,
    separator: argv.separator,
  };
}

module.exports = getArguments;
