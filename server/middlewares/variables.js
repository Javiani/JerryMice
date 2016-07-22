export default ( app ) => {

	app.locals.basedir = app.get('views')

	return ( req, res, next ) =>{

		global.request = req
		global.response = res
		global.require = require

		next()
	}
}
