var path = require('path');

module.exports = function( app, config ){

	return function( req, res ){

		var api, reponse, url;
		url = req.path.split(req.route.path).pop();

		try{
			api = require( '../'+ config.folder + path.normalize(url) );
			response = api.call? api( req, res ) :api;

			if( req.query.callback )
				res.jsonp( response );
			else
				res.send( response );

		}catch(e){
			res.status(500).send({error :e});
		}
	};
}
