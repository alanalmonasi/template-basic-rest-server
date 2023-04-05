const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtValidator = async (req = request, res = response, next) => {
   const token = req.header('x-token');
   if (!token) {
      return res.status(401).json({
         msg: 'Missing token',
      });
   }

   try {
      const { uid } = jwt.verify(token, process.env.SECRET_JWT);
      const authUser = await User.findById(uid);

      if (!authUser) {
         return res.status(401).json({
            msg: 'The user trying to make this action does not exist!',
         });
      }

      if (!authUser.active) {
         return res.status(401).json({
            msg: 'The user trying to make this action is not active!',
         });
      }

      // This creates a new property in the object req object, which passes by reference to all the middlewares in delete request
      req.authUser = authUser;
      next();
   } catch (error) {
      console.log(error);
      res.status(401).json({
         msg: 'Invalid token',
      });
   }
};

module.exports = {
   jwtValidator,
};
