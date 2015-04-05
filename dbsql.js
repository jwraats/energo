var mysql = require('mysql');
var settings = require('./config');

//Database connection
var sqlCon = mysql.createConnection(
    {
        host : settings.mysql.host,
        user : settings.mysql.username,
        password : settings.mysql.password,
        database : settings.mysql.database
    });

module.exports = sqlCon;