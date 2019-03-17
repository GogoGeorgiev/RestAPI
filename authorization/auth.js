const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config/config');
const checkToken = expressJwt({ secret: config.secrets.jwt });

//Use this Hardcoded User for signIn and get a token
const User = {
  "id": 1,
  "username": "Test",
  "password": "TestPass"
};

exports.decodeToken = function () {
  return function (req, res, next) {
    // Follow the 'Bearer 034930493' format
    // so checkToken() can see it and decode it
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }
    // this will call next if token is valid
    // and send error if its not. It will attached
    // the decoded token to req.user
    checkToken(req, res, next);
  };
};

exports.verifyUser = function () {
  return function (req, res, next) {
    const user = User;
    const username = req.body.username;
    const password = req.body.password;
    // check if no username or password
    if (!username || !password) {
      res.status(400).send('You need a username and password');
      return;
    }
    //check if the password match for the username
    if (username != user.username || password != user.password) {
      res.status(401).send('No user with the given username or password');
    }
    // if everything is good,
    // then attach to req.user
    // and call next so the controller
    req.user = user;
    next();
  }
};

// util method to sign tokens on signup
exports.signToken = function () {
  return jwt.sign(
    {
      username: User.username,
      password: User.password
    },
    config.secrets.jwt,
    {
      expiresIn: config.expireTime
    }
  );
};
