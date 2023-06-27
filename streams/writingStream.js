const fs = require("fs");

function createWritingStream(finalPath) {
  const startFileSymbol = "[";

  const writingStream = fs.createWriteStream(finalPath);

  writingStream.on("open", () => writingStream.write(startFileSymbol));

  writingStream.on("error", (err) =>
    console.error(`Error in writingStream: ${err.message}`)
  );

  return writingStream;
}

module.exports = createWritingStream;
