var sax = require('sax');

exports.handler = function() {
	return new AlbumHandler();
};

var AlbumHandler = function () {
	this.body = '';
};

AlbumHandler.prototype.onData = function() {
	return function(chunk) {
		this.body += chunk;
	};
};

AlbumHandler.prototype.onEnd = function(response) {
	return function() {
		var album = {};
		var albumArray = [];

		var strict = false;
		var parser = sax.parser(strict, {lowercase: true});

		parser.onerror = function(e) {
			console.log('sax parser error: ' + e.message);
		};
		parser.onattribute = function(attr) {
  			//console.log('sax parser tag: ' + parser.tag.name + ' attr: ' + attr.name + ': ' + attr.value);
  			var attrname = attr.name;
  			if (attrname === 'title'
  				|| attrname === 'album'
  				|| attrname === 'id') {
	  			album[attrname] = attr.value;
  			}
		};
		parser.onopentag = function(node) {
			//console.log('sax parser opentag: ' + node.name);
			if (node.name === 'song') {
				albumArray.push(album);
				album = {};				
			}
		};
		parser.onclosetag = function(name) {
			//console.log('sax parser closetag: ' + name);
		};
		parser.onend = function() {
			console.log('sax parser end.');
			response.json(albumArray);
		};

		parser.write(this.body).close();
	};
};
