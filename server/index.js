var server = require("./server");
var router = require("./router");
var requestHandlers = require("./request_handlers.js");

var handle = {}
handle["/play"] = requestHandlers.play;
handle["/stop"] = requestHandlers.stop;

server.start(router.route, handle);
