var querystring = require("querystring"),
	child_process = require("child_process"),
	children = require("./process_children");

function play(request, response, query) {
	console.log("play " + query);
	var queries = querystring.parse(query);
	var stream = queries["stream"];
	var command = queries["command"];
	var options = queries["options[]"];
	console.log("stream: " + stream);
	console.log("command: " + command);
	console.log("options[]: " + options);

	stopBefore();
	options.push(stream);
	var child = child_process.spawn(command, options);
	child.stdout.on('end', function() {
		console.log("player process end");
	});
	children.push(child);
}

function stop(request, response, query) {
	console.log("stop ");
	stopBefore();
}

function stopBefore() {
	var child = children.pop();
	if (child) {
		child.stdin.write("quit\n");
	}
}

exports.play = play;
exports.stop = stop;
