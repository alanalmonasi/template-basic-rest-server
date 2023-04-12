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

app.use('/api/auth', require('./routes/auth'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/products', require('./routes/products'));
app.use('/api/search', require('./routes/search'));
app.use('/api/users', require('./routes/users'));

app.listen(port, () => {
   console.log(`App listening on port ${port}!`);
});
