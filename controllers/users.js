const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const userGet = async (req = request, res = response) => {
   const { limit = 5, from = 0 } = req.query;

   const [total, users] = await Promise.all([
      User.countDocuments({ active: true }),
      User.find({ active: true }).skip(+from).limit(+limit),
   ]);

   res.json({
      total,
      users,
   });
};

const userPost = async (req = request, res = response) => {
   const { name, email, password, role } = req.body;

   const user = new User({
      name,
      email,
      password,
      role,
   });

   const salt = bcrypt.genSaltSync();
   user.password = bcrypt.hashSync(password, salt);

   await user.save();

   res.json({
      msg: 'User created successfully',
      user,
   });
};

const userPut = async (req = request, res = response) => {
   const { id } = req.params;
   const { _id, password, google, email, ...rest } = req.body;

   if (password) {
      const salt = bcrypt.genSaltSync();
      rest.password = bcrypt.hashSync(password, salt);
   }

   const user = await User.findByIdAndUpdate(id, rest, { new: true });

   res.json({
      msg: 'User updated successfully!',
      user,
   });
};

const userPatch = (req = request, res = response) => {
   res.json({
      msg: 'Patch request',
   });
};

const userDelete = async (req = request, res = response) => {
   const { id } = req.params;
   const user = await User.findByIdAndUpdate(
      id,
      { active: false },
      { new: true }
   );

   res.json({
      msg: `User with ID ${id} has ben successfully deleted!`,
      user,
   });
};

module.exports = {
   userDelete,
   userGet,
   userPatch,
   userPost,
   userPut,
};
