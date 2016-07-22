import glob from 'glob'
import path from 'path'

export default ( app ) => {

	let data 	 = glob.sync('./server/mock/data/**/*.js').reduce( reduce, {})
	let services = glob.sync('./server/mock/services/**/*.js').reduce( reduce, {})

	return ( req, res, next ) =>{
		app.locals.mock = { data, services }
		next()
	}
}

let reduce = ( acc, file ) =>{

	let module = path.resolve( file )
	let name   = path.basename( file, '.js' )

	name = name.replace(/\-/g, '_')
	acc[ name ] = require( module ).default
	return acc
}