var sax = require('sax');
var configReader = require('../configReader');
var http = require('http');

exports.handler = function () {
	return new ArtistHandler();
};

var ArtistHandler = function () {
	this.body = '';
};

ArtistHandler.prototype.onData = function () {
	return function(chunk) {
		this.body += chunk;
	};
};

ArtistHandler.prototype.onEnd = function (response) {
	return function() {
		var albumArray = [];
		var album = {};
		var artist = {};

		var strict = false;
		var parser = sax.parser(strict, {lowercase: true});

		parser.onerror = function(e) {
			console.log('sax parser error: ' + e.message);
		};
		parser.onattribute = function(attr) {
  			//console.log('sax parser tag: ' + parser.tag.name + ' attr: ' + attr.name + ': ' + attr.value);
  			var tagname = parser.tag.name;
  			if (tagname === 'album') {
  				album[attr.name] = attr.value;
  			}
  			if (tagname === 'artist') {
  				artist[attr.name] = attr.value;
  			}
		};
		parser.onopentag = function(node) {
			//console.log('sax parser opentag: ' + node.name);
			if (node.name === 'album') {
				albumArray.push(album);
				album = {};
			}
		};
		parser.onclosetag = function(name) {
			//console.log('sax parser closetag: ' + name);
		};
		parser.onend = function() {
			console.log('sax parser end.');

			for (var index in albumArray) {
				var albumId = albumArray[index].id;
				var options = configReader.httpOptions({
					method: 'album',
					id: albumId
				});
				http.get(options, function(res) {
				  	console.log('subsonic response [album: ' + albumId + ']: ' + res.statusCode);
				  	var handler = require('./album').handler();
				  	res.on('data', handler.onData());
				  	res.on('end', handler.onEnd(response));
				}).on('error', function(e) {
					console.log('error: ' + e.message);
				});
			}

  			response.render('subsonicArtist', {
  				logo: 'Websonic',
				title: 'Websonic :' + artist.name,
				artist: artist.name,
				albums: albumArray,
			});
		};

		parser.write(this.body).close();
	};
};
