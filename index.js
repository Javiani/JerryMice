import JerryMice from './jerrymice'

export default
class Application extends JerryMice{

	constructor(){
		super({ baseURL: './server' })
	}

	engine( app ){
		app.set('view engine', 'pug')
		app.set('views', './client/views')
	}

	middlewares( app, express ){
		app.use( express.static('client') )
		app.use( this.middleware.variables( app ) )
		app.use( this.middleware.mock( app ) )
	}

	routes( app ){
		app.get('/mock/*', this.route.services({}))
		app.get( '*', this.route.default({ 404 :'404' }))
	}
}

JerryMice.bootstrap( Application, {} )
