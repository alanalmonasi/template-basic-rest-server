const { Router } = require('express');
const { check } = require('express-validator');

const { validateField } = require('../middlewares/field-validator');
const { uploadFile, updateImg, showImg } = require('../controllers/uploads');
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
   updateImg
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
