const { Router } = require('express');
const { check } = require('express-validator');

const {
   createCategory,
   getCategory,
   getCategories,
   deleteCategory,
   updateCategory,
} = require('../controllers/categories');

const { categoryExist } = require('../helpers/db-validators');
const { validateField, jwtValidator, isAdmin } = require('../middlewares');

const router = Router();

router.get('/', getCategories);

router.get(
   '/:id',
   [
      check('id', 'The given id does not exist').isMongoId(),
      check('id').custom(categoryExist),
      validateField,
   ],
   getCategory
);

router.post(
   '/',
   [
      jwtValidator,
      check('name', 'A name is required').not().isEmpty(),
      validateField,
   ],
   createCategory
);

router.put(
   '/:id',
   [
      jwtValidator,
      check('id', 'The given id does not exist').isMongoId(),
      check('name', 'There must be a new name').not().isEmpty(),
      check('id').custom(categoryExist),
      validateField,
   ],
   updateCategory
);

router.delete(
   '/:id',
   [
      jwtValidator,
      isAdmin,
      check('id', 'The ID is not valid').isMongoId(),
      check('id').custom(categoryExist),
      validateField,
   ],
   deleteCategory
);

module.exports = router;
