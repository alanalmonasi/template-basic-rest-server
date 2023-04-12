const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Category, Product, User } = require('../models');

const availableColections = ['users', 'products', 'roles', 'categories'];

const searchUsers = async (term = '', res = response) => {
   const isMongoID = ObjectId.isValid(term);

   if (isMongoID) {
      const user = await User.findById(term);
      return res.json({
         results: user ? [user] : [],
      });
   }

   const regex = new RegExp(term, 'i');

   const users = await User.find({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ active: true }],
   });

   res.json({
      results: users,
   });
};

const searchProducts = async (term = '', res = response) => {
   const isMongoID = ObjectId.isValid(term);

   if (isMongoID) {
      const product = await Product.findById(term).populate('category', 'name');
      return res.json({
         results: product ? [product] : [],
      });
   }

   const regex = new RegExp(term, 'i');

   const products = await Product.find({ name: regex, active: true }).populate(
      'category',
      'name'
   );

   res.json({
      results: products,
   });
};

const searchCategories = async (term = '', res = response) => {
   const isMongoID = ObjectId.isValid(term);

   if (isMongoID) {
      const category = await Category.findById(term);
      return res.json({
         results: category ? [category] : [],
      });
   }

   const regex = new RegExp(term, 'i');

   const categories = await Category.find({ name: regex, active: true });

   res.json({
      results: categories,
   });
};

const search = (req = request, res = response) => {
   const { collection, term } = req.params;

   if (!availableColections.includes(collection)) {
      return res.status(400).json({
         msg: `Available collections are: ${availableColections}`,
      });
   }

   switch (collection) {
      case 'users':
         searchUsers(term, res);
         break;
      case 'products':
         searchProducts(term, res);
         break;
      case 'categories':
         searchCategories(term, res);
         break;
      default:
         res.status(500).json({
            msg: 'Please ask for help...',
         });
         break;
   }
};

module.exports = {
   search,
};
