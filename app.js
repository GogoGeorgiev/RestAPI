const express = require('express');
const mongoose = require('mongoose');

const app = express();
const config = require('./config/config');

// connect to db: Use config.dev for localDB and config.test for RemoteDB 
mongoose.connect(config.test, { useNewUrlParser: true });

// call global middleware
require('./middleware/appMiddlware')(app);

const productRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRouter');
const signInRRouter = require('./routes/signInRouter');

app.use('/api', productRouter);
app.use('/api', orderRouter);
app.use('/api', signInRRouter);

// global error handling
app.use(function(err, req, res, next) {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }
  res.status(400).send('Something went wrong with the request...');
});

app.server = app.listen(config.port, () => {
  console.log(`Runing on port ${config.port}`);
});

// export the app for testing
module.exports = app;
