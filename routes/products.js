const { Router } = require('express');
const { check } = require('express-validator');

const {
   createProduct,
   deleteProduct,
   getProduct,
   getProducts,
   updateProduct,
} = require('../controllers/products');

const { productExist, categoryExist } = require('../helpers/db-validators');
const { jwtValidator, validateField, isAdmin } = require('../middlewares');

const router = Router();

router.get('/', getProducts);

router.get(
   '/:id',
   [
      check('id', 'The given id does not exist').isMongoId(),
      check('id').custom(productExist),
      validateField,
   ],
   getProduct
);

router.post(
   '/',
   [
      jwtValidator,
      check('name', 'A name is required').not().isEmpty(),
      check('category', 'A category is required').not().isEmpty(),
      validateField,
   ],
   createProduct
);

router.put(
   '/:id',
   [
      jwtValidator,
      check('id', 'The given id does not exist').isMongoId(),
      check('name', 'There must be a new name').not().isEmpty(),
      check('id').custom(productExist),
      validateField,
   ],
   updateProduct
);

router.delete(
   '/:id',
   [
      jwtValidator,
      isAdmin,
      check('id', 'The ID is not valid').isMongoId(),
      check('id').custom(productExist),
      validateField,
   ],
   deleteProduct
);

module.exports = router;
