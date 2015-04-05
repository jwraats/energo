var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/halsteren', function(req, res, next) {
    res.render('halsteren');
});

router.get('/welberg', function(req, res, next) {
    res.render('welberg');
});

module.exports = router;
