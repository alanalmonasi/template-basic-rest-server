const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFiles = (
   files,
   allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'],
   folder = ''
) => {
   return new Promise((resolve, reject) => {
      const { file } = files;
      const name = file.name.split('.');
      const extension = name.at(-1);

      if (!allowedExtensions.includes(extension)) {
         return reject(`Allowed extensions are: ${allowedExtensions}`);
      }

      const tempName = uuidv4() + '.' + extension;
      const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

      // Use the mv() method to place the file somewhere on your server
      file.mv(uploadPath, (err) => {
         if (err) {
            reject(err);
         }

         resolve(tempName);
      });
   });
};

module.exports = {
   uploadFiles,
};
