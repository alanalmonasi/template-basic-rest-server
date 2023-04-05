const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req = request, res = response) => {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email });

      if (!user) {
         return res.status(400).json({
            msg: 'User / password incorrect - incorrect email',
         });
      }

      if (!user.active) {
         return res.status(400).json({
            msg: 'User / password incorrect - no active',
         });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
         return res.status(400).json({
            msg: 'User / password incorrect - incorrect password',
         });
      }

      const token = await generateJWT(user.id);

      res.json({
         msg: 'User logged successfully',
         user,
         token,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Can not login, try later',
      });
   }
};

module.exports = {
   login,
};
