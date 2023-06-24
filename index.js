const path = require("path");

const readAndConvertFile = require("./utilities/converterInStream.js");
const writeJsonFile = require("./utilities/writeJsonFile.js");
const loadFileOnGoogle = require("./utilities/googleCloud.js");
const getArguments = require("./utilities/getArguments.js");
const envs = require("./utilities/getEnv.js");

const {
  googleDriveClientId,
  googleDriveClientSecret,
  googleDriveRedirectUri,
  googleDriveRefreshToken,
} = envs;
const { sourceFile, separator, resultFile } = getArguments();

const finalPath = path.resolve(__dirname, resultFile);

readAndConvertFile(sourceFile, separator)
  .then((jsonData) => writeJsonFile(jsonData, finalPath))
  .then(() => {
    loadFileOnGoogle({
      clientId: googleDriveClientId,
      clientSecret: googleDriveClientSecret,
      redirectUri: googleDriveRedirectUri,
      refreshToken: googleDriveRefreshToken,
      folderName: "task_1_csv_converter",
      finalPath,
    });
  });
