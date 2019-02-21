
import { Request , Response }  from 'express' ; 

import express from 'express' ; 

import routeliste from './route/index'  ;

const path = require('path') ; 

const app = express() ; 

app.set('views', path.join(__dirname, 'resources/views'));

app.set('view enginer','ejs')

export default class Serveur{
 
	readonly port: number

	constructor(port: number){
		this.port = port ; 
	}

	async start(){

		//initialisation des middleware de l'applications 
		await this.middleware();
		
		//initialisation des routes de l'application 
		let route = await routeliste();
		this.route( route ) ; 

	}

	//Initialisation des tout les middleware de l'application 
	async middleware(){

		let cbl = require('./middleware/index') ; 
		let middleware = await cbl( app ) ; 

	}

	route( routes ){

		for( let r of routes ){
			//applle des méthode route et faire des boucle 
			if ( typeof app[r.verb] === 'function' ) {
				let cbl = require('./controller/'+r.ctrl) ;
				app[r.verb](r.url,cbl)
			} 
		}

		app.listen( this.port , () => {
			console.log('le seruver est démarré sur le port',this.port)
		})

	}

}