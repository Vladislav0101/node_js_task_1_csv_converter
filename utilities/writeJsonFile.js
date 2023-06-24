const fs = require("fs");
const path = require("path");

function writeJsonFile(jsonData, resultFile) {
  const newFilePath = path.resolve(__dirname, resultFile);

  fs.writeFile(newFilePath, jsonData, (err) => {
    if (err) {
      console.log("err", err);
      return;
    }
  });
}

module.exports = writeJsonFile;
