var express = require('express');
var db = require('../dbsql'); //Bron: http://stackoverflow.com/questions/25125615/nodejs-express-make-available-mysql-connection-object-in-router-file
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var meters = [];
  //var meetings = db.query('SELECT * FROM meeting ORDER BY timestamp DESC LIMIT 0,2', function (err, rows, fields) {
  //  var date0 = new Date(rows[0].timestamp);
  //  var date1 = new Date(rows[1].timestamp);
  //  meters.push({
  //      'meter': 'Welberg',
  //      'gebruik': 360000.0 / ((date0.getTime()) - (date1.getTime()))
  //    });
  //  res.render('index', {'meters': meters});
  //});
    res.render('index');
});

module.exports = router;
