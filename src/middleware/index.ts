
import { Express ,  Application }  from 'express' ; 
import express from 'express' ; 

import { DbInterface } from '../interface/DbInterface';

const bodyParser = require('body-parser') ; 

const path = require('path') ; 
 
const passport = require('passport') ; 

const cookieParser = require('cookie-parser');

const LocalStrategy = require('passport-local').Strategy;

const session = require('express-session');

module.exports = async function ( app : Application , db : DbInterface ) :Promise<boolean>{

	/*
	*	Déclaration de tout les middleware ( meme ce que l'on crée )
	*/

	app.use(express.json());
	
	app.use('/assets',express.static(path.join(__dirname, '../resources/asset'))) ; 

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))
	 
	// parse application/json
	app.use(bodyParser.json())

	//app.use(cookieParser());

	app.use(session({
	  	secret: 'secret',
	  	saveUninitialized: true,
	  	resave: true
	}));

	passport.use(new LocalStrategy( function(username, password, done) {

    	return done(null, {username:'heldino'});
  	}));

	app.use(passport.initialize());
	
	app.use(passport.session());
	
	//création de fonction de response en express JS ( Retourne en fonction JSON ) 
	app.use(require('./response')) ;

	//middleware de langue
	app.use(require('./lang')) ;

	app.use(require('./infusionsoft')) ; 
	
	/***************************************************************/

	return new Promise<boolean>( resolve => resolve( true ));


};
