var config = require('./config.json');

exports.httpOptions = function(target) {
	return {
		hostname: config.subsonic.host,
		port: config.subsonic.port,
		path: getPath(target),
		method: 'GET'
	};
};

function getPath(target) {
	var restBase = config.subsonic.rest.base;
	var user = config.subsonic.rest.user;
	var pass = config.subsonic.rest.pass;
	var ver = config.subsonic.rest.version;
	var cli = config.subsonic.rest.clientName;
	var auth = '?u=' + user + '&p=' + pass + '&v=' + ver + '&c=' + cli;

	var path = '';
	if (target.method === 'artists')
		path = restBase + '/getArtists.view' + auth;
	else if (target.method === 'artist')
		path = restBase + '/getArtist.view' + auth + '&id=' + target.id;
	else if (target.method === 'album')
		path = restBase + '/getAlbum.view' + auth + '&id=' + target.id;
	else if (target.method === 'stream')
		path = restBase + '/stream.view' + auth + '&id=' + target.id;
	
	return path;
}