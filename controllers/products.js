const { request, response } = require('express');
const { Category, Product } = require('../models');

const getProducts = async (req = request, res = response) => {
   const { limit = 5, from = 0 } = req.query;

   const [total, products] = await Promise.all([
      Product.countDocuments({ active: true }),
      Product.find({ active: true })
         .skip(+from)
         .limit(+limit)
         .populate('user', 'name')
         .populate('category', 'name'),
   ]);

   res.json({
      total,
      products,
   });
};

const getProduct = async (req = request, res = response) => {
   const { id } = req.params;
   const product = await Product.findById(id)
      .populate('user', 'name')
      .populate('category', 'name');

   res.json({
      msg: 'Product found',
      product,
   });
};

const createProduct = async (req = request, res = response) => {
   const name = req.body.name.toUpperCase();
   const category = req.body.category.toUpperCase();
   const { active, user, ...data } = req.body;

   const [productDB, categoryDB] = await Promise.all([
      Product.findOne({ name }),
      Category.findOne({ name: category }),
   ]);

   if (productDB) {
      return res.status(400).json({
         msg: `The product '${productDB.name}' already exists!`,
      });
   }

   if (!categoryDB) {
      return res.status(400).json({
         msg: `The category ${category} does not exist!`,
      });
   }

   const product = new Product({
      name,
      user: req.authUser._id,
      price: data.price,
      category: categoryDB._id,
      description: data.description,
   });

   await product.save();

   res.json({
      msg: 'Product added successfully!',
      product,
   });
};

const updateProduct = async (req = request, res = response) => {
   const { id } = req.params;
   const { active, user, ...data } = req.body;

   data.name = data.name.toUpperCase();
   data.user = req.authUser._id;

   if (data.category) {
      data.category = data.category.toUpperCase();
      const categoryDB = await Category.findOne({ name: data.category });

      if (!categoryDB) {
         return res.status(400).json({
            msg: `The category ${data.category} does not exist!`,
         });
      }
      data.category = categoryDB._id;
   }

   const product = await Product.findByIdAndUpdate(id, data, {
      new: true,
   })
      .populate('user', 'name')
      .populate('category', 'name');

   res.json({
      msg: 'Product updated',
      product,
   });
};

const deleteProduct = async (req = request, res = response) => {
   const { id } = req.params;
   const deletedProduct = await Product.findByIdAndUpdate(
      id,
      { active: false },
      { new: true }
   ).populate('user', 'name');

   res.json({
      msg: `Product ${deletedProduct.name} has been successfully deleted!`,
      deletedProduct,
   });
};

module.exports = {
   createProduct,
   deleteProduct,
   getProduct,
   getProducts,
   updateProduct,
};
