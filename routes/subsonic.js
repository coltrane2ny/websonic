
var http = require('http');
var configReader = require('../configReader');

exports.artists = function(req, res) {
	console.log('=== artists ===');
	var options = configReader.httpOptions({method: 'artists'});

    http.get(options, function(_res) {
	  	console.log('subsonic response: ' + _res.statusCode);

		var handler = require('../handlers/artists').handler();
		_res.on('data', handler.onData());
		_res.on('end', handler.onEnd(res));
  	}).on('error', function(e) {
  		console.log('error: ' + e.message);
	});
};

exports.artist = function(req, res) {
	var artistId = req.params.id;
	console.log('=== artist[id: ' + artistId + '] ===');
	var options = configReader.httpOptions({
		method: 'artist',
		id: artistId
	});

    http.get(options, function(_res) {
	  	console.log('subsonic response[artist: ' + artistId + ']: ' + _res.statusCode);

	  	var handler = require('../handlers/artist').handler();
	  	_res.on('data', handler.onData());
	  	_res.on('end', handler.onEnd(res));
	}).on('error', function(e) {
  		console.log('error: ' + e.message);
	});
};
