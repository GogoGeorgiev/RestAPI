const express = require("express");
const router = express.Router();
const auth = require('../authorization/auth');
const controller = require('../controllers/ordersController');

const checkUser = auth.decodeToken();

//It's important this function is at the top
router.param('orderId', controller.params);

router.route('/orders')
.get(controller.getAll)
.post(checkUser, controller.post);

router.route('/orders/:orderId')
.get(controller.getOne)
.patch(checkUser, controller.changeStatus);

module.exports = router;