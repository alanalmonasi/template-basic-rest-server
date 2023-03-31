const { Router } = require('express');
const {
   userGet,
   userPost,
   userPut,
   userPatch,
   userDelete,
} = require('../controllers/users');

const router = Router();

router.get('/', userGet);

router.post('/', userPost);

router.put('/:id', userPut);

router.patch('/:id', userPatch);

router.delete('/:id', userDelete);

module.exports = router;
