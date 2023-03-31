const { request, response } = require('express');

const userGet = (req = request, res = response) => {
   // const query = req.query;
   res.json({
      id: '1234567890',
      name: 'FlintsGG',
   });
};

const userPost = (req = request, res = response) => {
   // const {} = req.body;
   res.json({
      id: '1234567890',
      name: 'FlintsGG',
   });
};

const userPut = (req = request, res = response) => {
   // const { id } = req.params;
   // const query = req.query;
   // const {} = req.body;
   res.json({
      id: '1234567890',
      name: 'FlintsGG',
   });
};

const userPatch = (req = request, res = response) => {
   // const { id } = req.params;
   // const query = req.query;
   res.json({
      id: '1234567890',
      name: 'FlintsGG',
   });
};

const userDelete = (req = request, res = response) => {
   // const { id } = req.params;
   // const query = req.query;
   res.json({
      id: '1234567890',
      name: 'FlintsGG',
   });
};

module.exports = {
   userDelete,
   userGet,
   userPatch,
   userPost,
   userPut,
};
