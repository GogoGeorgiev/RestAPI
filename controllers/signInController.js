const signToken = require('../authorization/auth').signToken;

exports.signin = function(req, res, next) {
  // req.user will be there from the middleware
  // verify user. Then just create a token
  // and send it back for the client to consume
  const token = signToken();
  res.json({token: token});
};
