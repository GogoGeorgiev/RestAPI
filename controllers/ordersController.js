const Order = require("../models/order");

exports.params = function (req, res, next, id) {
  Order.findById(id)
    .then(function (order) {
      if (!order) {
        next(new Error('No order with that id'));
      } else {
        req.order = order;
        next();
      }
    }, function (err) {
      next(err);
    });
};

exports.getAll = (req, res, next) => {
  Order.find()
    .select("_id date products status")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            date: doc.date,
            products: doc.products,
            status: doc.status,
            links: {
              url: `http://${req.headers.host}/api/orders/${doc._id}`
            }
          };
        })
      });
    }, function (err) {
      next(err);
    });
};

exports.post = function(req, res, next) {
  const newOrder = req.body;

  Order.create(newOrder)
    .then(function(order) {
      res.status(201).json(order);
    }, function(err) {
      next(err);
    });
};

exports.getOne = function (req, res, next) {
  const order = req.order;
  res.json(order);
};

exports.changeStatus = function(req, res, next){
    const { order } = req;
    order.status = req.body.status;
    if(order.status != 'Pending' && order.status != 'Processing' && order.status != 'Delivered' && order.status != 'Cancelled'){
      return res.status(400).send({
        message: `The order status ${req.body.status} is not allowed!`,
        allowedStatuses: 'Pending, Processing, Delivered, Cancelled'
      });
    }
    req.order.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json({
        message: `Status of order ${order._id} is updated to ${req.body.status}`,
        order
      });
    });
  };

