var path = require('path');

module.exports = function( app, config ){

	config = config || {};

	return function( req, res, next ){

		var url, filepath, ext;

		url = path.normalize( req.path );
		url = url == '/' ? url + 'index' : url;
		filepath = url.substring(1).replace(/\/$/g, '');
		ext = ( config.ext || '.htm' );

		res.render( filepath + ext, function( err, content ){

			//Handles index default look-up
			if( !content && filepath != 'index' ){
				res.render( path.join( filepath, ('index' + ext) ));
			}
			//Handles successfull index look-up
			else if( content ){
				res.send( content );
			}
			//Sends error to the application flow
			else{
				next( err );
			}
		});
	};
};
