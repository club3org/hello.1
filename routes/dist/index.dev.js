"use strict";

var express = require('express');

var _require = require('../app'),
    render = _require.render;

var router = express.Router();

var Models = require('../models/order');

;
var showorder = Models.addorder;

var _ = require('underscore');

router.use(express.urlencoded({
  extended: false
}));
router.use(express.json());
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.get('/order/:id', function (req, res) {
  var id = req.params.id;
  showorder.findById(id, function (err, order) {
    if (err) {
      console.log(err);
    }

    res.render('detail', {
      title: '订单详情',
      order: order
    });
    return;
  });
});
router.get('/orderlist', function (req, res) {
  showorder.fetch(function (err, orders) {
    if (err) {
      console.log(err);
    }

    res.render('ok', {
      title: '',
      orders: orders
    });
    return;
  });
});
router.get('/orderreset/:id', function (req, res, next) {
  var id = req.params.id;

  if (id) {
    showorder.findById(id, function (err, order) {
      res.render('admin', {
        title: '更新',
        order: order
      });
      return;
    });
  }

  return;
});
router.get('/filedown/:filename', function (req, res) {
  res.download("public2/download" + req.params.filename);
});
router.post('/ordersnew', function (req, res) {
  var id = req.body._id;
  var orderobj = req.body;
  console.log(orderobj);

  var _order;

  if (id) {
    showorder.findById(id, function (err, order) {
      console.log(order);
      _order = _.extend(order, orderobj);

      _order.save(function (err, order) {
        res.redirect('/order/' + id);
      });
    });
  } else {
    _order = new showorder({
      name: orderobj.name
    });

    _order.save(function (err, order) {
      if (err) {
        console.log(err);
      }

      res.redirect('/order/' + order._id);
    });
  }

  return;
});
router["delete"]('/orderlist', function (req, res) {
  var id = req.query.id;

  if (id) {
    showorder.deleteOne({
      _id: id
    }, function (err, order) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          success: 1
        });
      }
    });
  }

  return;
});
module.exports = router;