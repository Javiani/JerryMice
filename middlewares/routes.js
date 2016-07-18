import path from 'path'

export default ( req, res, next ) => {

	let url 	= path.resolve( req.path )
	let config 	= { url, req, res, next }

	render( config )
}

function render( config ){

	let url  = config.url
	let res  = config.res
	let next = config.next

	res.render( url.replace(/^\//, ''), function( err, content ){

		let name = path.basename( url )

		if( err ){
			if( name != 'index' ){
				config.url = path.resolve( url, 'index')
				render( config )
			}
			else if( err.message.match(/template not found/) )
				res.render('404')
			else
				next( err )
		}else{
			res.send( content )
		}
	})
}
