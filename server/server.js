var http = require("http");
var port = 8888;

function start(route, handle) {
	http.createServer(function(request, response) {
		console.log("RECV " + request.url);
		route(handle, request, response);
	}).listen(port);

	console.log("Server started listening on http://localhost:" + port);
}

exports.start = start;
