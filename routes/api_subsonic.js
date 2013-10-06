var http = require('http');
var configReader = require('../configReader');

exports.album = function(req, res) {
	var albumId = req.params.id;
	console.log('=== API album[id: ' + albumId + '] ===');
	var options = configReader.httpOptions({
		method: 'album',
		id: albumId
	});

    http.get(options, function(_res) {
	  	console.log('subsonic response[album: ' + albumId + ']: ' + _res.statusCode);

	  	var handler = require('../handlers/album').handler();
	  	_res.on('data', handler.onData());
	  	_res.on('end', handler.onEnd(res));
	}).on('error', function(e) {
  		console.log('error: ' + e.message);
	});
};

exports.play = function(req, res) {	
	var songId = req.params.id;
	console.log('=== API play[song id: ' + songId + '] ===');
	res.json({});

	var options = configReader.httpOptions({
		method: 'stream',
		id: songId
	});
	var url = 'http://' + options.hostname + ':' + options.port + options.path;
	console.log('url: ' + url);

	var child_process = require("child_process");
	var command = configReader.config.player.command;
	var cmd_options = configReader.config.player.options;
	cmd_options.push(url);
	var child = child_process.spawn(command, cmd_options);
	child.stdout.on('end', function() {
		console.log("player process end");
	});
};