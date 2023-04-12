const { request, response } = require('express');
const { uploadFiles } = require('../helpers');

const uploadFile = async (req = request, res = response) => {
   if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      return res.status(400).json({ msg: 'No files were uploaded.' });
   }

   try {
      const pathFile = await uploadFiles(req.files, undefined, 'imgs');

      res.json({
         name: `File uploaded as: ${pathFile}`,
      });
   } catch (msg) {
      res.status(400).json({
         msg,
      });
   }
};

module.exports = {
   uploadFile,
};
