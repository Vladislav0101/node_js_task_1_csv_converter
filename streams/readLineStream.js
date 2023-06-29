const readline = require("readline");

const getSeparatorFromCsv = require("../utilities/getSeparatorFromCsv");
const lineConverter = require("../utilities/lineConverter");

const COMMA = ",";

function createReadlineStream(readingStream, writingStream, separator) {
  let globalIsTemplateReady = false;
  let globalTemplateKeys = [];
  let separatorForJson = "";
  let separatorFromCsv = null;

  const rl = readline.createInterface({
    input: readingStream,
    crlfDelay: Infinity,
  });

  rl.on("line", (csvLine) => {
    if (!separatorFromCsv) separatorFromCsv = getSeparatorFromCsv(csvLine);

    const { set, isTemplateReady, templateKeys } = lineConverter({
      csvLine,
      separator: separatorFromCsv,
      isTemplateReady: globalIsTemplateReady,
      templateKeys: globalTemplateKeys,
    });

    if (!globalIsTemplateReady) {
      globalIsTemplateReady = isTemplateReady;
      globalTemplateKeys = templateKeys;
    } else {
      writingStream.write(separatorForJson + JSON.stringify(set));
      separatorForJson = COMMA;
    }
  });

  rl.on("close", () => writingStream.write("]"));

  return rl;
}

module.exports = createReadlineStream;
