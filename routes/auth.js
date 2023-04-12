const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');
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

router.post(
   '/google',
   [check('id_token', 'id token is necessary').not().isEmpty(), validateField],
   googleSignIn
);

module.exports = router;
