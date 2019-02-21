
import { Express ,  Application }  from 'express' ; 
import express from 'express' ; 

const path = require('path') ; 

module.exports = async function ( app : Application ) :Promise<boolean>{

	/*
	*	Déclaration de tout les middleware ( meme ce que l'on crée )
	*/

	app.use(express.json());
	
	app.use('/assets',express.static(path.join(__dirname, '../resources/asset'))) ; 
	
	//création de fonction de response en express JS ( Retourne en fonction JSON ) 
	app.use(require('./response')) ;

	//middleware de langue
	app.use(require('./lang')) ;

	app.use(require('./infusionsoft')) ; 
	
	/***************************************************************/

	return new Promise<boolean>( resolve => resolve( true ));


};
