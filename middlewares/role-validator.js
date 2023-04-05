const { response } = require('express');

const isAdmin = (req, res = response, next) => {
   if (!req.authUser) {
      return res.status(500).json({
         msg: 'Token must be validated before checking the role',
      });
   }

   const { name, role } = req.authUser;

   if (role !== 'admin_role') {
      return res.status(401).json({
         msg: `${name} is not admin`,
      });
   }

   next();
};

const hasRole = (...roles) => {
   return (req, res = response, next) => {
      if (!req.authUser) {
         return res.status(500).json({
            msg: 'Token must be validated before checking the role',
         });
      }

      if (!roles.includes(req.authUser.role)) {
         return res.status(401).json({
            msg: `This action requires one of this roles: ${roles}`,
         });
      }

      next();
   };
};

module.exports = {
   hasRole,
   isAdmin,
};
