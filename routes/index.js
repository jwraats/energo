var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var meters = [];
  res.render('index');
});

module.exports = router;
