const path = require('path');
const fs = require('fs');
const { request, response } = require('express');
const { User, Product } = require('../models');
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

const updateImg = async (req = request, res = response) => {
   if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      return res.status(400).json({ msg: 'No files were uploaded.' });
   }

   const { collection, id } = req.params;

   let model;

   switch (collection) {
      case 'users':
         model = await User.findById(id);
         if (!model) {
            return res.status(400).json({
               msg: `No user with given ID: ${id}`,
            });
         }
         break;
      case 'products':
         model = await Product.findById(id);
         if (!model) {
            return res.status(400).json({
               msg: `No product found with given ID: ${id}`,
            });
         }
         break;

      default:
         return res.status(500).json({
            msg: `Collection ${collection} not validated yet, please contact support`,
         });
   }

   // Delete previous imgs
   if (model.img) {
      const pathImg = path.join(__dirname, '../uploads', collection, model.img);
      if (fs.existsSync(pathImg)) {
         fs.unlinkSync(pathImg);
      }
   }

   const name = await uploadFiles(req.files, undefined, collection);
   model.img = name;

   await model.save();

   res.json({
      model,
   });
};

const showImg = async (req = request, res = response) => {
   const { collection, id } = req.params;

   let model;

   switch (collection) {
      case 'users':
         model = await User.findById(id);
         if (!model) {
            return res.status(400).json({
               msg: `No user with given ID: ${id}`,
            });
         }
         break;
      case 'products':
         model = await Product.findById(id);
         if (!model) {
            return res.status(400).json({
               msg: `No product found with given ID: ${id}`,
            });
         }
         break;

      default:
         return res.status(500).json({
            msg: `Collection ${collection} not validated yet, please contact support`,
         });
   }

   if (model.img) {
      const pathImg = path.join(__dirname, '../uploads', collection, model.img);
      if (fs.existsSync(pathImg)) {
         return res.sendFile(pathImg);
      }
   }

   res.sendFile(path.join(__dirname, '../assets/no-image.jpg'));
};

module.exports = {
   showImg,
   uploadFile,
   updateImg,
};
