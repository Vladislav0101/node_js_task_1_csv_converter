const dotenv = require("dotenv");
dotenv.config();

const googleDriveClientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
const googleDriveClientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
const googleDriveRedirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI;
const googleDriveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;

module.exports = {
  googleDriveClientId,
  googleDriveClientSecret,
  googleDriveRedirectUri,
  googleDriveRefreshToken,
};
