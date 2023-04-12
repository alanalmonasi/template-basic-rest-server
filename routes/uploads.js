const { Router } = require('express');
const { check } = require('express-validator');

const { validateField } = require('../middlewares/field-validator');
const { uploadFile } = require('../controllers/uploads');

const router = Router();

router.post('/', uploadFile);

module.exports = router;
