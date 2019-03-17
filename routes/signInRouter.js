const router = require('express').Router();

const verifyUser = require('../authorization/auth').verifyUser;

const controller = require('../controllers/signInController');

// the password and username match what is in the DB
router.route('/signin')
.post(verifyUser(), controller.signin);

module.exports = router;
