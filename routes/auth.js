var jwt = require('jwt-simple');
var settings = require('../config');

var username = settings.auth.username;
var password = settings.auth.password;
var key = settings.auth.key;

var auth = {
	tokenValidator: function(req, res, next) {
		var token = (req.header('X-Access-Token')) || '';
		
		if (token) {
			try {
				var decoded = jwt.decode(token, key);

				// Check if token is from known user
				// for now ..				
				if( decoded.iss == username) {
					req.app.set("userid", decoded.iss);
					console.log("Userid: " + req.app.get('userid'));
					return next();
				}
				else {
					res.status(401);
					res.json({
						"status": 401, "message": "unknown userid, bye"
					});
				}
			}
			catch (err) {
				console.log("Authorization failed: " + err);
			}
		}

		res.status(401);
		res.json({
			"status": 401, "message": "niet geautoriseerd, bye"
		});
	},

	login: function(req, res) {
		var userUsername = req.body.username || '';
		var userPassword = req.body.password || '';
		// Check for empy body
		if( userUsername == '' || userPassword == '' )
		{
			res.status(401);
			res.json( { "status": 401,
						"message":"Unknown USER, bye"
			});
			return;
		}

		// Check for valid user/passwd combo
        if ((username == userUsername) && (password == userPassword)) {
            var now = new Date();
            var expires = now.setHours(now.getDay() + 10);
            var token = jwt.encode({
                iss: username,
                exp: expires
            }, key);

            res.status = 200;
            res.json({
                token: token,
                expires: expires,
                user: username
            });
        }
        else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Unknown USER, bye"
            });
        }
    } 
}

module.exports = auth;