var express = require('express');
var db = require('../dbsql'); //Bron: http://stackoverflow.com/questions/25125615/nodejs-express-make-available-mysql-connection-object-in-router-file
var router = express.Router();

router.get('/', function(req, res, next) {
    var apiHelper = [];
    apiHelper.push({
        'function': '/api/login',
        'description': 'Met deze functie kan worden ingelogd.'
    });
    apiHelper.push({
        'function': '/api/getGraphs',
        'returns' : [
            {'type': 'Array',
                'name': 'json'},
        ],
        'description': 'Geeft de legenda en data terug van de grafiek per dag (van de afgelopen 31 dagen)'
    });
    apiHelper.push({
        'function': '/api/getGraphs/24',
        'returns' : [
            {'type': 'Array',
                'name': 'json'},
        ],
        'description': 'Geeft de legenda en data terug van de grafiek per uur van de laatste 24 uur'
    });
    res.render('helper', {'functions': apiHelper});
});

router.get('/getGraphs', function(req, res, next){
    var meters = db.query('SELECT timestamp as date,(COUNT(*) / 1000) as kw,(SELECT (MAX(g.total_today) - MIN(g.total_today)) FROM homeautomatisation.green as g WHERE YEAR(g.timestamp) = YEAR(m.timestamp) AND MONTH(g.timestamp) = MONTH(m.timestamp) AND DAY(g.timestamp) = DAY(m.timestamp)) as green FROM homeautomatisation.meeting as m GROUP BY YEAR(m.timestamp), MONTH(m.timestamp), DAY(m.timestamp) ORDER BY m.timestamp DESC LIMIT 0,31', function(error, rows){
        console.log(rows);
        var labels = [];
        var deliver = [];
        var green = [];
        var greenDiscount = [];
        if(rows.length !== 0) {
            rows.reverse();
        }
        for(var i in rows){
            labels.push(new Date(rows[i].date).toLocaleString());
            deliver.push(rows[i].kw);
            green.push(rows[i].green);
            greenDiscount.push((rows[i].green * 0.08));
        }
        res.json({
            'labels': labels,
            'deliver': deliver,
            'green': green,
            'greenDiscount': greenDiscount
        });
    });
});

router.get('/getGraphs/24', function(req, res, next){
    var meters = db.query('SELECT timestamp as date,(COUNT(*) / 1000) as kw,(SELECT (MAX(g.total_today) - MIN(g.total_today)) FROM homeautomatisation.green as g WHERE YEAR(g.timestamp) = YEAR(m.timestamp) AND MONTH(g.timestamp) = MONTH(m.timestamp) AND DAY(g.timestamp) = DAY(m.timestamp) AND HOUR(g.timestamp) = HOUR(m.timestamp)) as green FROM homeautomatisation.meeting as m GROUP BY YEAR(m.timestamp), MONTH(m.timestamp), DAY(m.timestamp), HOUR(m.timestamp) ORDER BY m.timestamp DESC LIMIT 0,24', function(error, rows){
        console.log(error);
        var labels = [];
        var deliver = [];
        var green = [];
        var greenDiscount = [];
        if(rows.length !== 0) {
            rows.reverse();
        }
        for(var i in rows){
            labels.push(new Date(rows[i].date).toLocaleString());
            deliver.push(rows[i].kw);
            green.push(rows[i].green);
            greenDiscount.push((rows[i].green * 0.08));
        }
        res.json({
            'labels': labels,
            'deliver': deliver,
            'green': green,
            'greenDiscount': greenDiscount
        });
    });
});

module.exports = router;
