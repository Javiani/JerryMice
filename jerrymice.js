import express from 'express'
import glob from 'glob'
import path from 'path'

let app 	 = express()
let ignore 	 = /start|constructor/

export default class JerryMice{

	constructor( config ){

		let settings = Object.assign( {}, JerryMice.settings, config )
		let baseURL = settings.baseURL

		let middlewares = path.resolve( `${baseURL}`, `${settings.middlewares}` )
		let routes = path.resolve( `${baseURL}`, `${settings.routes}` )

		this.settings = settings
		this.middleware = JerryMice.read( middlewares )
		this.route = JerryMice.read( routes )
	}

	start(){
		this.settings.app.listen( this.settings.port )
		JerryMice.output( this.settings )
	}
}

JerryMice.settings = {
	express,
	app,
	baseUrl: '',
	port :3000,
	middlewares: 'middlewares',
	routes :'routes'
}

JerryMice.bootstrap = ( Class, options )=>{
	let instance = new Class( options )
	run( instance )
	instance.start()
}

JerryMice.read = ( folder )=>{
	return glob.sync(`${folder}/**/*.js`)
		.reduce( ( acc, file ) => {

			let m = require( file )
			m = m.default? m.default :m
			acc[ path.basename( file, '.js') ] = m

			return acc
		}, {})
}

JerryMice.output = ( config )=>{
	console.log('\x1b[32m%s\x1b[0m------------------------------------------\x1b[32m%s\x1b[0m', '+', '+')
	console.log(' \x1b[32m%s\x1b[0m Jerry Mice \x1b[32m%s\x1b[0m', '☁', '☁' )
	console.log(' \x1b[36m%s\x1b[0m :Express.js', '@Powered by')
	console.log(' \x1b[36m%s\x1b[0m :\x1b[32m%s\x1b[0m', '@Served at', 'http://localhost:'+config.port+'/')
	console.log(' \x1b[36m%s\x1b[0m : Hit ctrl+c to shutdown server', '@Quit')
	console.log('\x1b[32m%s\x1b[0m------------------------------------------\x1b[32m%s\x1b[0m', '+', '+')
}


let run = ( instance )=>{

	let app = instance.settings.app
	let prototype = Object.getPrototypeOf( instance )
	let properties = Object.getOwnPropertyNames( prototype )

	properties.forEach( name => {
		if( instance[ name ].call && !name.match( ignore ) ){
			instance[ name ].call( instance, app, express )
		}
	})
}
