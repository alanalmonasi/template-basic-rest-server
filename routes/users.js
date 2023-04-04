const { Router } = require('express');
const { check } = require('express-validator');

const {
   userGet,
   userPost,
   userPut,
   userPatch,
   userDelete,
} = require('../controllers/users');

const { emailExist, validRole, idExist } = require('../helpers/db-validators');
const { validateField } = require('../middlewares/field-validator');

const router = Router();

router.get('/', userGet);

router.post(
   '/',
   [
      check('name', 'Name is mandatory').not().isEmpty(),
      check(
         'password',
         'The password is mandatory and most be at least 6 characters'
      ).isLength({ min: 6 }),
      check('email', 'Email is not valid').isEmail(),
      check('email').custom(emailExist),
      check('role').custom(validRole),
      validateField,
   ],
   userPost
);

router.put(
   '/:id',
   [
      check('id', 'The ID is not valid').isMongoId(),
      check('id').custom(idExist),
      check('role').custom(validRole),
      validateField,
   ],
   userPut
);

router.patch('/:id', userPatch);

router.delete(
   '/:id',
   [
      check('id', 'The ID is not valid').isMongoId(),
      check('id').custom(idExist),
      validateField,
   ],
   userDelete
);

module.exports = router;
