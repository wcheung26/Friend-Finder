var fs = require('fs');
var path = require('path');

module.exports = function(app){
	app.post("/api/submit", function(req, res) {
		var user = {};
		user.name = req.body.name;
		user.photo = req.body.photo;
		user.char = [];
		for (var i = 1; i < 8; i++) {
			var id = 'q' + i;
			user.char.push(parseInt(req.body[id]));
		}
		// user.char.push(req.body.q1, req.body.q2, req.body.q3, req.body.q4, req.body.q5, req.body.q6, req.body.q7);
		console.log(user);
		var match = {name: 'dummy', photo: 'dummy.jpg', diff: 999};
		fs.readFile(path.join(__dirname, '../data/friends.json'), 'utf-8', function(err, body){
			if (err) throw err;
			body = JSON.parse(body);
			for (var i = 0; i < body.length; i++) {
				console.log(i);
				var sum = 0;
				for (var q = 0; q < 7; q++) {
					var abs = Math.abs(user.char[q] - body[i].char[q])
					console.log(body[i].char[q] + ':' + abs);
					sum += abs;
				}
				if (sum < match.diff) {
					match = {name: body[i].name, photo: body[i].photo, diff: sum};
					console.log("new match!", match);
				}
			}
			res.send(match);
		});
		// fs.appendFile(path.join(__dirname, '../data/friends.json'), ',\n' + JSON.stringify(user), function(err) {
		// 	if (err) throw err;
		// });
	});
};