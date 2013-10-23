
/**
 * Module dependencies.
 */

var express = require('express')
  , subsonic = require('./routes/subsonic')
  , player = require('./routes/player')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', subsonic.artists);
app.get('/artist/:id', subsonic.artist);
app.get('/json/album/:id', subsonic.album);
app.get('/player/play/:id', player.play);
app.get('/player/pause/', player.pause);
app.get('/player/stop/', player.stop);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
