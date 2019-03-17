const bodyParser = require('body-parser');

// setup global middleware
module.exports = function(app) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};
