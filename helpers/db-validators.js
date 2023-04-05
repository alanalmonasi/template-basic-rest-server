const Role = require('../models/role');
const User = require('../models/user');

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

module.exports = {
   emailExist,
   idExist,
   isActive,
   validRole,
};
