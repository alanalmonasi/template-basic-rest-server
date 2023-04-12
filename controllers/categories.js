const { request, response } = require('express');
const { Category } = require('../models');

const getCategories = async (req = request, res = response) => {
   const { limit = 5, from = 0 } = req.query;

   const [total, categories] = await Promise.all([
      Category.countDocuments({ active: true }),
      Category.find({ active: true })
         .skip(+from)
         .limit(+limit)
         .populate('user', 'name'),
   ]);

   res.json({
      total,
      categories,
   });
};

const getCategory = async (req = request, res = response) => {
   const { id } = req.params;
   const category = await Category.findById(id).populate('user', 'name');

   res.json({
      msg: 'Category found',
      category,
   });
};

const createCategory = async (req = request, res = response) => {
   const name = req.body.name.toUpperCase();
   const categoryDB = await Category.findOne({ name });

   if (categoryDB) {
      return res.status(400).json({
         msg: `The category '${categoryDB.name}' already exists!`,
      });
   }

   const data = {
      name,
      user: req.authUser._id,
   };

   const category = new Category(data);

   await category.save();

   res.status(201).json({
      msg: 'Category created successfully',
      category,
   });
};

// update category
const updateCategory = async (req = request, res = response) => {
   const { id } = req.params;
   const { active, user, ...data } = req.body;

   data.name = data.name.toUpperCase();
   data.user = req.authUser._id;

   const category = await Category.findByIdAndUpdate(id, data, {
      new: true,
   }).populate('user', 'name');

   res.json({
      msg: 'Category updated successfully',
      category,
   });
};

// delete the category
const deleteCategory = async (req = request, res = response) => {
   const { id } = req.params;
   const deletedCategory = await Category.findByIdAndUpdate(
      id,
      { active: false },
      { new: true }
   ).populate('user', 'name');

   res.json({
      msg: `Category ${deletedCategory.name} has been successfully deleted!`,
      deletedCategory,
   });
};

module.exports = {
   createCategory,
   deleteCategory,
   getCategories,
   getCategory,
   updateCategory,
};
