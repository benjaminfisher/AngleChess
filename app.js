
/**
 * Module dependencies.
 */

var express = require('express'),
  mw = require('less-middleware'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  chess = require('chess');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(mw({
    force: true,
    dest: __dirname + '/public/stylesheets',
    src: __dirname + '/src/less',
    prefix: '/stylesheets',
    compress: true
  }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// create game client
var gc = chess.create(),
  move = null,
  status=null;

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
