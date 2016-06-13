var path = require('path');

module.exports = function( app, config ){

	var env = config.env;

	global.api = function( url ){
		return require( '../'+ path.normalize( config.folder + '/'+ url) )();
	};

	env.addGlobal('console', console);
	env.addGlobal('api', global.api);
	env.addGlobal('request', global.request);
	env.addGlobal('response', global.response);

	return function( req, res, next ){

		global.request = req;
		global.response = res;

		next();
	};

}
