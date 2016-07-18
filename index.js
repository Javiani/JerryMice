import JerryMice from './jerrymice'

export default
class Application extends JerryMice{

	constructor(){
		super()
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
		app.get( '*', this.middleware.routes )
	}
}

JerryMice.bootstrap( Application, {} )
