import JerryMice from './jerrymice'
import nunjucks from 'nunjucks'

export default
class Application extends JerryMice{

	constructor(){
		super()
	}

	engine( app ){

		app.set('view engine', 'njk')
		app.set('views', './client/views')

		this.env = nunjucks.configure('client/views', {
			express   : app,
			autoescape: false,
			watch	  : true
		})
	}

	middlewares( app, express ){
		app.use( express.static('client') )
		app.use( this.middleware.variables( app, this.env ) )
		app.use( this.middleware.mock( app ) )
	}

	routes( app ){
		app.get('/mock/*', this.middleware.services({}))
		app.get( '*', this.middleware.routes({ 404 :'404' }))
	}
}

JerryMice.bootstrap( Application, {} )
