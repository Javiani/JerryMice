export default ( app, env ) => {

	return ( req, res, next ) =>{

		global.request = req
		global.response = res
		global.require = require

		app.locals.basedir = app.get('views')

		env.addGlobal('require', global.require)
		env.addGlobal('request', global.request)
		env.addGlobal('response', global.response)
		env.addGlobal('console', global.console)
		env.addGlobal('getType', ( variable )=> variable.constructor.name )

		next()
	}
}
