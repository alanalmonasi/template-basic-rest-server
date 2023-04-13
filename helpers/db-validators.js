const { Category, Role, User, Product } = require('../models');

const emailExist = async (email = '') => {
   const emailExist = await User.findOne({ email });
   if (emailExist) {
      throw new Error(`The email ${email} is already in use!`);
   }
};

const validRole = async (role = '') => {
   const roleExist = await Role.findOne({ role });
   if (!roleExist) {
      throw new Error(`Specified role ${role} does not exist!`);
   }
};

const idExist = async (id) => {
   const idExist = await User.findById(id);
   if (!idExist) {
      throw new Error(`The ID ${id} does not exist in the database`);
   }
};

const isActive = async (id) => {
   const isActive = await User.findById(id);
   if (!isActive.active) {
      throw new Error('This account has been already deactivate');
   }
};

const categoryExist = async (id) => {
   const category = await Category.findById(id);
   if (!category || !category.active) {
      throw new Error('Category not found');
   }
};

const productExist = async (id) => {
   const product = await Product.findById(id);
   if (!product || !product.active) {
      throw new Error('Product not found');
   }
};

const collectionsAllowed = (collection = '', collections = []) => {
   const included = collections.includes(collection);
   if (!included) {
      throw new Error(
         `The collection ${collection} is not allowed. Allowed colllections are: ${collections}`
      );
   }
   return true;
};

module.exports = {
   categoryExist,
   collectionsAllowed,
   emailExist,
   idExist,
   isActive,
   productExist,
   validRole,
};
