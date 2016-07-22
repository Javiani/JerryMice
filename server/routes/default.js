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
	let name = path.basename( url )

	res.render( url.replace(/^\//, ''), ( err, content ) =>{

		if( err ){
			if( name != 'index' ){
				config.url = path.resolve( url, 'index' )
				render( config )
			}
			else if( err.message.match(/failed to lookup/i) )
				res.render( config.options['404'] || '404' )
			else
				next( err )
		}else{
			res.send( content )
		}
	})
}
