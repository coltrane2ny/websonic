var url = require("url");

function route(handle, request, response) {
	var pathname = url.parse(request.url).pathname;
	var query = url.parse(request.url).query;
	console.log("route " + pathname + " " + query);

	if (typeof handle[pathname] === 'function') {
		handle[pathname](request, response, query);
	} else {
		console.log("handler not found.");
	}
}

exports.route = route;
