/*
	@Server
	Express + Nunjucks
*/

var	nunjucks  = require('nunjucks'),
	express   = require('express'),
	app       = express(),
	env;

// It seems to be not necessary...
//app.use( express.static( 'www') );

env = nunjucks.configure('www/views', {
	express   : app,
	autoescape: true,
	watch	  : true
});

/*
	@Middlewares
*/

//Globals
var globals = require('./middlewares/globals');
app.use( globals(app, { folder:'api', env :env }) );

//Api's
var api = require('./middlewares/api');
app.get( /service/, api(app, { folder: 'api'}) );

//Default Route
var routes = require('./middlewares/routes');
app.get( /^[^.]+$|\.(?!(\w*)$)([^.]+$)/, routes(app) );

app.listen( 3000 );
