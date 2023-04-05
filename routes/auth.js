const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validateField } = require('../middlewares/field-validator');

const router = Router();

router.post(
   '/login',
   [
      check('email', 'You have to use a valid email').isEmail(),
      check('password', 'Please enter your password').not().isEmpty(),
      validateField,
   ],
   login
);

module.exports = router;
