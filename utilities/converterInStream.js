const fs = require("fs");
const lineConverter = require("./lineConverter");
const readline = require("readline");

function readAndConvertFile(filePath, separator = ",") {
  return new Promise((resolve, reject) => {
    let resultArrayFromCsv = [];

    let globalIsTemplateReady = false;
    let globalTemplateKeys = [];

    const fileStream = fs.createReadStream(filePath, { encoding: "utf-8" });

    const rl = readline.createInterface({
      input: fileStream,
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
        resultArrayFromCsv.push(set);
      }
    });

    fileStream.on("close", () => {
      resolve(JSON.stringify(resultArrayFromCsv));
    });

    fileStream.on("error", (err) =>
      reject(`Error in fileStream:${err.message}`)
    );
  });
}

module.exports = readAndConvertFile;
