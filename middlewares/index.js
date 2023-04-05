const validatesField = require('../middlewares/field-validator');
const validatesJWT = require('../middlewares/jwt-validator');
const validatesRole = require('../middlewares/role-validator');

module.exports = {
   ...validatesField,
   ...validatesJWT,
   ...validatesRole,
};
