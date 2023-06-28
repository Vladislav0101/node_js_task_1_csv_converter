const path = require("path");

const envs = require("./utilities/getEnv.js");
const makeConversion = require("./utilities/makeConversion.js");
const getArguments = require("./utilities/getArguments.js");
const loadFileOnGoogle = require("./utilities/googleCloud.js");

const {
  googleDriveClientId,
  googleDriveClientSecret,
  googleDriveRedirectUri,
  googleDriveRefreshToken,
} = require("./utilities/getEnv.js");

const { sourceFile, separator, resultFile } = getArguments();

const finalPath = path.resolve(__dirname, resultFile);

makeConversion({ sourcePath: sourceFile, finalPath, separator }).then(() => {
  loadFileOnGoogle({
    clientId: googleDriveClientId,
    clientSecret: googleDriveClientSecret,
    redirectUri: googleDriveRedirectUri,
    refreshToken: googleDriveRefreshToken,
    folderName: "task_1_csv_converter",
    finalPath,
  });
});
