
import { Request , Response }  from 'express' ; 

import express from 'express' ; 

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