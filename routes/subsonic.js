var http = require('http');
var configReader = require('../configReader');

exports.artists = function(req, res) {
	console.log('=== artists ===');
	var options = configReader.httpOptions({method: 'artists'});

    http.get(options, function(_res) {
	  	console.log('subsonic response: ' + _res.statusCode);

		var handler = require('../subsonic/artists').handler();
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

	  	var handler = require('../subsonic/artist').handler();
	  	_res.on('data', handler.onData());
	  	_res.on('end', handler.onEnd(res));
	}).on('error', function(e) {
  		console.log('error: ' + e.message);
	});
};

exports.album = function(req, res) {
	var albumId = req.params.id;
	console.log('=== API album[id: ' + albumId + '] ===');
	var options = configReader.httpOptions({
		method: 'album',
		id: albumId
	});

    http.get(options, function(_res) {
	  	console.log('subsonic response[album: ' + albumId + ']: ' + _res.statusCode);

	  	var handler = require('../subsonic/album').handler();
	  	_res.on('data', handler.onData());
	  	_res.on('end', handler.onEnd(res));
	}).on('error', function(e) {
  		console.log('error: ' + e.message);
	});
};
