
import { Request , Response }  from 'express' ; 

import express from 'express' ; 

import routeliste from './route/index'  ;

const path = require('path') ; 

const app = express() ; 

import { createModels } from './models';

app.set('views', path.join(__dirname, 'resources/views'));

app.set('view enginer','ejs') 

/*
*	Initialisation de la base de donner 
*/
const sequelizeConfig = require('./config/sequelize');

//on utilise cette instance de base de donner unique pour la suite de l'application
const db = createModels(sequelizeConfig);

//création des tables et instanciation de la base de données

db.sequelize.sync({ force: false });

const validator = require("./request/");  

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
		let middleware = await cbl(app,db) ; 

	}

	route( routes ){

		for( let r of routes ){
			//applle des méthode route et faire des boucle 
			if ( typeof app[r.verb] === 'function' ) {
				let cbl = require('./controller/'+r.ctrl) ;
				r.validator?
					//on a une validation ICI
					app[r.verb](r.url,validator.bind({rull:r.validator}),cbl.bind({db})):
					//on a pas une validation ici
					app[r.verb](r.url,cbl.bind({db}))
				
			} 
		}

		app.listen( this.port , () => {
			console.log('le seruver est démarré sur le port',this.port)
		}) 

	}

} 