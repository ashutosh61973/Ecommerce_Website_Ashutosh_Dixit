const express = require('express');
const app = express();

const errorMiddleWare = require('./middleware/error');

app.use(express.json());

//Route import
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
app.use('/api/v1', product);
app.use('/api/v1', user);
// Middleware for errors
app.use(errorMiddleWare);

module.exports = app;
