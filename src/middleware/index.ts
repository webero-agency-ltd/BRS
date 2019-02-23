
import { Express ,  Application }  from 'express' ; 
import express from 'express' ; 

var bodyParser = require('body-parser') ; 
const path = require('path') ; 

module.exports = async function ( app : Application ) :Promise<boolean>{

	/*
	*	Déclaration de tout les middleware ( meme ce que l'on crée )
	*/

	app.use(express.json());
	
	app.use('/assets',express.static(path.join(__dirname, '../resources/asset'))) ; 

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))
	 
	// parse application/json
	app.use(bodyParser.json())
	
	//création de fonction de response en express JS ( Retourne en fonction JSON ) 
	app.use(require('./response')) ;

	//middleware de langue
	app.use(require('./lang')) ;

	app.use(require('./infusionsoft')) ; 
	
	/***************************************************************/

	return new Promise<boolean>( resolve => resolve( true ));


};
