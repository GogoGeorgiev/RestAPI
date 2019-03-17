const _ = require("lodash");
const Product = require("../models/product");

exports.params = function (req, res, next, id) {
  Product.findById(id)
    .then(function (product) {
      if (!product) {
        next(new Error('No product with that id'));
      } else {
        req.product = product;
        next();
      }
    }, function (err) {
      next(err);
    });
};

exports.getAll = (req, res, next) => {
  Product.find()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            category: doc.category,
            price: doc.price,
            links: {
              url: `http://${req.headers.host}/api/products/${doc._id}`
            }
          };
        })
      });
    })
};

exports.post = function(req, res, next) {
  const newProduct = req.body;

  Product.create(newProduct)
    .then(function(product) {
      res.status(201).json(product);
    }, function(err) {
      next(err);
    });
};

exports.getOne = function (req, res, next) {
  const product = req.product;
  res.status(200).json({
    product,
    url: `http://${req.headers.host}/api/products`
  });
};

exports.put = function (req, res, next) {
  const product = req.product;

  const update = req.body;

  _.merge(product, update);

  product.save(function (err, saved) {
    if (err) {
      next(err);
    } else {
      res.status(200).json(saved);
    }
  })
};

exports.delete = function(req, res, next) {
  req.product.remove(function(err, deleted) {
    if (err) {
      next(err);
    } else {
      res.status(204).json();
    }
  });
};
