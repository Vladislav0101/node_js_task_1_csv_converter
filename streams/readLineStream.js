const readline = require("readline");

const lineConverter = require("../utilities/lineConverter");

function createReadlineStream(readingStream, writingStream, separator) {
  let globalIsTemplateReady = false;
  let globalTemplateKeys = [];
  let separatorForJson = "";

  const rl = readline.createInterface({
    input: readingStream,
    crlfDelay: Infinity,
  });

  rl.on("line", (csvLine) => {
    const { set, isTemplateReady, templateKeys } = lineConverter({
      csvLine,
      separator,
      isTemplateReady: globalIsTemplateReady,
      templateKeys: globalTemplateKeys,
    });

    if (!globalIsTemplateReady) {
      globalIsTemplateReady = isTemplateReady;
      globalTemplateKeys = templateKeys;
    } else {
      writingStream.write(separatorForJson + JSON.stringify(set));
      separatorForJson = ",";
    }
  });

  rl.on("close", () => writingStream.write("]"));

  return rl;
}

module.exports = createReadlineStream;
