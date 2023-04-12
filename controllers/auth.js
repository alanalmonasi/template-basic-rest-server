const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async (req = request, res = response) => {
   const { id_token } = req.body;

   try {
      const { name, img, email } = await googleVerify(id_token);

      let user = await User.findOne({ email });

      if (!user) {
         const data = {
            name,
            email,
            password: ':P',
            img,
            google: true,
         };

         user = new User(data);
         await user.save();
      }

      if (!user.active) {
         return res.status(401).json({
            msg: 'The user is deactivate, please contact support',
         });
      }

      const token = await generateJWT(user.id);

      res.json({
         msg: 'Successful',
         user,
         token,
      });
   } catch (error) {
      res.status(400).json({
         msg: 'Could not verify token ',
      });
   }
};

module.exports = {
   googleSignIn,
   login,
};
