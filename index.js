const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', require('./routes/users'));

app.listen(port, () => {
   console.log(`Example app listening on port ${port}!`);
});
