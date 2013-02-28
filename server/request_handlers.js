var querystring = require("querystring"),
	child_process = require("child_process");

function play(request, response, query) {
	console.log("play " + query);
	var queries = querystring.parse(query);
	var stream = queries["stream"];
	var player = queries["player"];
	console.log("stream: " + stream);
	console.log("player: " + player);

	var child = child_process.spawn(player, [stream]);
	child.stdout.on('end', function() {
		console.log("end");
	})
}

exports.play = play;
