var sax = require('sax');

exports.handler = function() {
	return new ArtistsHandler();
};

var ArtistsHandler = function () {
	this.body = '';
};

ArtistsHandler.prototype.onData = function() {
	return function(chunk) {
		this.body += chunk;
	};
};

ArtistsHandler.prototype.onEnd = function(response) {
	return function() {
		var index = {};
		var artist = {};
		var artistArray = [];

		var strict = false;
		var parser = sax.parser(strict, {lowercase: true});

		parser.onerror = function(e) {
			console.log('sax parser error: ' + e.message);
		};
		parser.onattribute = function(attr) {
			//console.log('sax parser tag: ' + parser.tag.name + ' attr: ' + attr.name + ': ' + attr.value);
			var tagname = parser.tag.name;
			if (tagname === 'index') {
				index.tag = tagname;
				index[attr.name] = attr.value;
			}
			if (tagname === 'artist') {
				artist.tag = tagname;
				artist[attr.name] = attr.value;
			}
		};
		parser.onopentag = function(node) {
			//console.log('sax parser opentag: ' + node.name);
			if (node.name === 'index') {
				artistArray.push(index);
				index = {};
			}
			if (node.name === 'artist') {
				artistArray.push(artist);
				artist = {};
			}
		};
		parser.onclosetag = function(name) {
			//console.log('sax parser closetag: ' + name);
		};
		parser.onend = function() {
			console.log('sax parser end.');
			response.render('subsonic', {
				logo: 'Websonic',
				title: 'Websonic :artists',
				artists: artistArray
			});
		};

		parser.write(this.body).close();
	};
};
