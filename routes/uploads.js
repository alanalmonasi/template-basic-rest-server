const { Router } = require('express');
const { check } = require('express-validator');

const { validateField } = require('../middlewares/field-validator');
const {
   uploadFile,
   showImg,
   updateImgCloudinary,
} = require('../controllers/uploads');
const { collectionsAllowed } = require('../helpers');

const router = Router();

router.post('/', uploadFile);

router.put(
   '/:collection/:id',
   [
      check('collection').custom((c) =>
         collectionsAllowed(c, ['users', 'products'])
      ),
      check('id', 'Valid mongoID is required').isMongoId(),
      validateField,
   ],
   updateImgCloudinary
);

router.get(
   '/:collection/:id',
   [
      check('collection').custom((c) =>
         collectionsAllowed(c, ['users', 'products'])
      ),
      check('id', 'Valid mongoID is required').isMongoId(),
      validateField,
   ],
   showImg
);

module.exports = router;
