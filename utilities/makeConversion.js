const createReadlineStream = require("../streams/readLineStream");
const createReadingStream = require("../streams/readingStream");
const createWritingStream = require("../streams/writingStream");

function makeConversion({ sourcePath, finalPath, separator }) {
  return new Promise((resolve, reject) => {
    const readingStream = createReadingStream(sourcePath);
    const writingStream = createWritingStream(finalPath);
    const readLineStream = createReadlineStream(
      readingStream,
      writingStream,
      separator
    );

    readLineStream.on("close", () => resolve());
  });
}

module.exports = makeConversion;
