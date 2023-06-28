const fs = require("fs");

function createReadingStream(sourcePath) {
  const readingStream = fs.createReadStream(sourcePath, {
    encoding: "utf-8",
  });

  readingStream.on("error", (err) =>
    console.error(`Error in readingStream: ${err.message}`)
  );

  return readingStream;
}

module.exports = createReadingStream;
