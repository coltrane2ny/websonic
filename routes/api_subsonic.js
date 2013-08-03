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