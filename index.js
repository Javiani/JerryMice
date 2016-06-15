/*
	@Server
	Express + Nunjucks
*/

var	nunjucks  = require('nunjucks'),
	express   = require('express'),
	app       = express(),
	port	  = 3000,
	env;

env = nunjucks.configure('www/views', {
	express   : app,
	autoescape: true,
	watch	  : true
});

/* @Middlewares */

//Globals
var globals = require('./middlewares/globals');
app.use( globals(app, { folder:'api', env :env }) );

//Api's
var api = require('./middlewares/api');
app.get( /service/, api(app, { folder: 'api'}) );

//Default Route
var routes = require('./middlewares/routes');
app.get( /^[^.]+$|\.(?!(\w*)$)([^.]+$)/, routes(app) );

app.listen( port );

welcome();

function welcome(){
	console.log('\x1b[32m%s\x1b[0m------------------------------------------\x1b[32m%s\x1b[0m', '+', '+');
	console.log(' \x1b[32m%s\x1b[0m Jerry Mice \x1b[32m%s\x1b[0m', '☁', '☁' );
	console.log(' \x1b[36m%s\x1b[0m :Express.js + Nunjucks', '@Powered by');
	console.log(' \x1b[36m%s\x1b[0m :\x1b[32m%s\x1b[0m', '@Served at', 'http://localhost:'+port+'/');
	console.log(' \x1b[36m%s\x1b[0m : Hit ctrl+c to shutdown server', '@Quit');
	console.log('\x1b[32m%s\x1b[0m------------------------------------------\x1b[32m%s\x1b[0m', '+', '+');
}
