const dbValidators = require('./db-validators');
const jwtGenerator = require('./generate-jwt');
const googleVerify = require('./google-verify');
const fileUploader = require('./upload-file');

module.exports = {
   ...dbValidators,
   ...jwtGenerator,
   ...googleVerify,
   ...fileUploader,
};
