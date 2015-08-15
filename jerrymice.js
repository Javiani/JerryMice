var
	express 	= require('express'),
	ejs			= require('ejs'),
	pack		= require('./package.json'),
	app 		= express(),

	models  	= './models/',
	services	= '/'+ (pack.jerrymice.routes.services || 'services') + '/',
	www			= pack.jerrymice.public,
	port		= pack.jerrymice.port,
	views		=  __dirname + '/' + www;

	//Setting Template engine systems
	app.set( 'view engine', 'htm' );
	app.engine( 'htm', ejs.renderFile );
	app.set( 'views' , views);

	//Setting Static folders
	app.use( express.static( www ) );

	//Explicit Request and Response objects globally
	app.use( globals );

	//Routes
	app.get( services + ':name', service );
	app.get( '*', render );

	//Starting Server
	app.listen( port );
	//Welcome
	welcome();

	global.site = {};

	global.model = function( name ){
		return require( models + name )();
	};

	//Middlewares
	function service( req, res ){
		var model = require( models + req.params.name );
		res.send( model() );
	}

	function globals( req, res, next ){
		global.request = req;
		global.response = res;
		next();
	}

	function render( req, res ){

		var url = req.path.replace(/\/*$/, ''); // Trailling slashs at the end of line

		res.render( 'views' + url, global, function( err, html ){
			global.site.content = err || html;
			res.render( 'layouts/' + global.site.layout, global, error( req, res ) );
		});
	}

	function error( req, res ){
		return function( err, html ){
			if( err ) res.render('views/error',{ err : err }); // File doesn't exist
			else res.end( html );
		};
	}

	function welcome(){
		console.log('\x1b[32m%s\x1b[0m------------------------------------------\x1b[32m%s\x1b[0m', '+', '+');
		console.log(' \x1b[32m%s\x1b[0m Jerry Mice \x1b[32m%s\x1b[0m', '☁', '☁' );
		console.log(' \x1b[36m%s\x1b[0m :Express.js', '@Powered by');
		console.log(' \x1b[36m%s\x1b[0m :\x1b[32m%s\x1b[0m', '@Served at', 'http://localhost:'+port+'/');
		console.log(' \x1b[36m%s\x1b[0m : Hit ctrl+c to shutdown server', '@Quit');
		console.log('\x1b[32m%s\x1b[0m------------------------------------------\x1b[32m%s\x1b[0m', '+', '+');
	}
