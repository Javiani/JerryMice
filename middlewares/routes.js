import path from 'path'

export default ( options ) =>{

	return ( req, res, next ) => {

		let url 	= path.resolve( req.path )
		let config 	= { url, req, res, next, options }

		render( config )
	}
}

function render( config ){

	let { url, res, next } = config

	res.render( url.replace(/^\//, ''), function( err, content ){

		let name = path.basename( url )

		if( err ){
			if( name != 'index' ){
				config.url = path.resolve( url, 'index' )
				render( config )
			}
			else if( err.message.match(/template not found|Failed to lookup/) )
				res.render( config.options['404'] )
			else
				next( err )
		}else{
			res.send( content )
		}
	})
}
