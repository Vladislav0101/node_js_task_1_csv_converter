const fs = require("fs");
const { google } = require("googleapis");

let driveClient = {};

async function loadFileOnGoogle({
  clientId,
  clientSecret,
  redirectUri,
  refreshToken,
  finalPath,
  folderName,
}) {
  driveClient = createDriveClient(
    clientId,
    clientSecret,
    redirectUri,
    refreshToken
  );
  let folderId;
  let folder;

  if (!fs.existsSync(finalPath)) {
    throw new Error("File not found!");
  }

  folder = await searchFolder(folderName).catch((error) => {
    console.error(error);
    return null;
  });

  if (folder) folderId = folder.id;
  else {
    folder = await createFolder(folderName);
    folderId = folder.data.id;
  }

  saveFile("convertedJson.json", finalPath, "json/application", folderId)
    .then(() => console.info("File uploaded successfully!"))
    .catch((error) => {
      console.error(error);
    })
    .finally(() => fs.unlinkSync(finalPath));
}

function createDriveClient(clientId, clientSecret, redirectUri, refreshToken) {
  const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

  client.setCredentials({ refresh_token: refreshToken });

  return google.drive({
    version: "v3",
    auth: client,
  });
}

function createFolder(folderName) {
  return driveClient.files.create({
    resource: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
    },
    fields: "id, name",
  });
}

function searchFolder(folderName) {
  return new Promise((resolve, reject) => {
    driveClient.files.list(
      {
        q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
        fields: "files(id, name)",
      },
      (err, res) => {
        if (err) {
          return reject(err);
        }

        return resolve(res.data.files ? res.data.files[0] : null);
      }
    );
  });
}

function saveFile(fileName, filePath, fileMimeType, folderId) {
  return driveClient.files.create({
    requestBody: {
      name: fileName,
      mimeType: fileMimeType,
      parents: folderId ? [folderId] : [],
    },
    media: {
      mimeType: fileMimeType,
      body: fs.createReadStream(filePath),
    },
  });
}

module.exports = loadFileOnGoogle;
