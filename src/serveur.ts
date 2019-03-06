
import { Request , Response }  from 'express' ; 

import express from 'express' ; 

const path = require('path') ; 

const app = express() ; 

import { createModels } from './models';

import { DbInterface } from './interface/DbInterface';

import hash from './lib/hash' ;

app.set('views', path.join(__dirname, 'resources/views'));

app.set('view enginer','ejs') 

/*
*	Initialisation de la base de donner 
*/
const sequelizeConfig = require('./config/sequelize');

//on utilise cette instance de base de donner unique pour la suite de l'application
const db = createModels(sequelizeConfig);

//création des tables et instanciation de la base de données
db.sequelize.sync({ force: false })
	//création d'utilisateur admin lors de l'instanciation de l'application 
	.then(()=>{

		let { User } = db as DbInterface ; 
		//recherche d'abord si l'utilisateur admin n'existe pas 
		db.User.findOne({
		    where: {
		        role: 'admin'
		    }
	    }).then( async function(dbUser) {
	      	// si l'utilisateur admin n'existe pas alors on le crée 
	      	if (!dbUser) {
		        let family_name = 'admin' ; 
				let given_name = 'admin' ; 
				let email = 'admin@gmail.com' ; 
				let role = 'admin' ; 
				let password = await hash('admin@gmail.com') ; 

				User.create({family_name,given_name,email,password,role})
					.then(user => {
						console.log('ADMIN OK')
					})
					.catch( e => console.log('ADMIN PAS OK') )
		    }

	    });
		
	}); 

export default class Serveur{
 
	readonly port: number

	constructor(port: number){
		this.port = port ; 
	}

	async start(){

		//initialisation des middleware de l'applications 
		await this.middleware();
		this.route() ; 

	}

	//Initialisation des tout les middleware de l'application 
	async middleware(){

		let cbl = require('./middleware/index') ; 
		let middleware = await cbl(app,db) ; 

	}

	async route(){

		let cbl = require('./route/index') ; 
		let route = await cbl(app,db) ; 

		app.listen( this.port , () => {
			console.log('le seruver est démarré sur le port',this.port)
		}) 

	}

} 