const minimist = require("minimist");
const fs = require("fs");

const requiredArguments = ["sourceFile", "resultFile"];

function checkArguments(argv) {
  requiredArguments.forEach((requiredArgument) => {
    if (!(requiredArgument in argv)) {
      throw new Error(`${requiredArgument} is require`);
    }
  });
}

function isExistedPath(path) {
  if (fs.existsSync(path)) {
    return path;
  } else {
    throw new Error("Source file is not defined");
  }
}

function checkJsonFormat(path) {
  return path.includes(".json") ? path : `${path}.json`;
}

function getArguments() {
  const argv = minimist(process.argv.slice(2));

  try {
    checkArguments(argv);

    return {
      sourceFile: isExistedPath(argv.sourceFile),
      resultFile: checkJsonFormat(argv.resultFile),
      separator: argv.separator,
    };
  } catch (err) {
    console.error(err);

    return false;
  }
}

module.exports = getArguments;
