const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');

const port = process.env.PORT;

const app = express();

dbConnection();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', require('./routes/users'));

app.listen(port, () => {
   console.log(`App listening on port ${port}!`);
});
