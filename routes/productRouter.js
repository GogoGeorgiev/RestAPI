const express = require("express");
const router = express.Router();
const auth = require('../authorization/auth');
const controller = require('../controllers/productsController');

const checkUser = auth.decodeToken();

//It's important this function is at the top
router.param('productId', controller.params);

router.route('/products')
.get(controller.getAll)
.post(checkUser, controller.post);

router.route('/products/:productId')
.get(controller.getOne)
.put(checkUser, controller.put)
.delete(checkUser, controller.delete);

module.exports = router;