export default ( app ) => {

	return ( req, res, next ) =>{

		global.request = req
		global.response = res
		global.require = require

		app.locals.basedir = app.get('views')

		next()
	}
}
