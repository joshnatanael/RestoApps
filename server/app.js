if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
require('dotenv').config();
const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const router = require('./routes');
var cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(router);
app.use(errorHandler);

module.exports = app;