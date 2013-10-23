var configReader = require('../configReader');
var Player = require('../player/player');

var player = new Player(configReader.config.player.command, configReader.config.player.options);

exports.play = function(req, res) {	
	var songId = req.params.id;
	if (songId) {
		console.log('=== API play[song id: ' + songId + '] ===');
		res.json({});

		var options = configReader.httpOptions({
			method: 'stream',
			id: songId
		});
		var url = 'http://' + options.hostname + ':' + options.port + options.path;
		console.log('url: ' + url);

		player.play(url);
	} else {
		console.log('=== API play ===');
		player.play();
	}
};

exports.pause = function(req, res) {
	console.log('=== API pause ===');
	res.json({});
	player.pause();
};

exports.stop = function(req, res) {
	console.log('=== API stop ===');
	res.json({});
	player.stop();
};