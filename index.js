var express 	= require('express'),
	ejs			= require('ejs'),
	path		= require('path'),
	app 		= express(),
	config;

function set( options ){

	var www;

	global.model = function( name ){
		return require( config.models + name )();
	};

	www 	= options.public || 'www';
	config 	=  {
		www 	:www,
		port	:options.port || 3000,
		models	:(options.baseUrl || '.') + '/'+ www + '/models/',
		views	:'./' + www,
		404		:(options[404] || '404'),
		error   :(options.error || 'error'),
		services:options.services || /services/
	};

	return config;
}

//Middlewares
function service( req, res ){

	var model, reponse, url;
	url = req.path.split(config.services.toString()).pop();

	try{
		model = require( config.models + path.normalize(url) );
		response = model.call? model() :model;
		if( req.query.callback )
			res.jsonp( response );
		else
			res.send( response );
	}catch(e){
		res.status(500).send({error :e});
	}
}

function globals( req, res, next ){
	global.error = null;
	global.site = {};
	global.data = {};
	global.request = req;
	global.response = res;
	next();
}

function render( req, res, next ){
	var url = 'views' + path.normalize(req.path);
	irender( url, req, res, next );
}

function irender(url, req, res, next ){
	res.render( url, global, function( err, html ){
		global.site.content = err || html;
		if(err){
			next(err);
		}else if( global.site.layout ){
			res.render( 'views/layouts/' + global.site.layout, global);
		}else{
			res.render( url, global);
		}
	});
}

function error(err, req, res, next ){
	if(err){
		global.error = err;
	}
	if(err && err.view && !err.view.path){
		res.status(404);
		irender('views/'+config[404], req, res, next);
	}else{
		res.status(500);
		irender('views/'+config.error, req, res, next);
	}
}

function set_express( callback ){

	//Setting Template engine systems
	app.set( 'view engine', 'htm' );
	app.engine( 'htm', ejs.renderFile );
	app.set( 'views' , config.views);

	app.use( express.static( config.www ) );
	app.use( globals );

	app.get(config.services, service );

	if( callback ){
		callback( app, irender );
	}

	//Generic url matcher, gets everything that looks like a REST excluding extentions files.
	// It's an variation of the form finded here:
	// http://stackoverflow.com/questions/23178316/regular-expression-for-excluding-file-types-exe-and-js
	app.get(/^[^.]+$|\.(?!(\w*)$)([^.]+$)/, render );

	app.use( error );
}

function welcome(){
	console.log('\x1b[32m%s\x1b[0m------------------------------------------\x1b[32m%s\x1b[0m', '+', '+');
	console.log(' \x1b[32m%s\x1b[0m Jerry Mice \x1b[32m%s\x1b[0m', '☁', '☁' );
	console.log(' \x1b[36m%s\x1b[0m :Express.js', '@Powered by');
	console.log(' \x1b[36m%s\x1b[0m :\x1b[32m%s\x1b[0m', '@Served at', 'http://localhost:'+config.port+'/');
	console.log(' \x1b[36m%s\x1b[0m : Hit ctrl+c to shutdown server', '@Quit');
	console.log('\x1b[32m%s\x1b[0m------------------------------------------\x1b[32m%s\x1b[0m', '+', '+');
}

module.exports = {

	run :function( options, fn ){

		set( options );
		set_express( fn );

		app.listen( process.env.PORT || options.port );
		welcome();
	}
};
