
import { typeRouter } from '../interface/typerouter';

import { Express ,  Application }  from 'express' ; 

import { DbInterface } from '../interface/DbInterface';

const passport = require('passport');

const validator = require("../request/"); 

module.exports = async function ( app : Application , db : DbInterface ) : Promise<boolean> {


	let login = passport.authenticate('local', { failureRedirect: '/login' })  ; 
	//ICI on ajoute tout les routes de l'applications 

	await app.get('/',login,require('../controller/index').bind({db})) ;

	await app.get('/login',require('../controller/login').bind({db})) ; 
	
	await app.get('/sinup',require('../controller/sinup').bind({db})) ; 

	//route administrateur 
	await app.get('/admin',login,require('../controller/admin/index').bind({db})) ; 

	// admin ajoute de tag et 
	await app.get('/admin/tags',login,validator.bind({rull:''}),require('../controller/admin/tags/find').bind({db})) ; 
	await app.post('/admin/tags',login,validator.bind({rull:'user'}),require('../controller/admin/tags/create').bind({db})); 

	//les différent route du produit
	await app.get('/admin/produit',login,require('../controller/admin/produit/index').bind({db})) ; 
	await app.post('/admin/produit',login,validator.bind({rull:'produitCreate'}),require('../controller/admin/produit/create').bind({db})) ;
	await app.put('/admin/produit',login,validator.bind({rull:'produitUpdate'}),require('../controller/admin/produit/update').bind({db})) ; /*.validate('produitUpdate') ;*/
	await app.delete('/admin/produit',login,require('../controller/admin/produit/delete').bind({db}));


	await app.get('/token',login,require('../controller/ifstToken').bind({db})) ; 

	/*
	*	Récupération Affilier des utilisateur
	*/
	await app.get('/affilier',login,require('../controller/infusionsoft/affilier').bind({db})) ; 


	//Route des utilisateurs de l'application 
	await app.get('/user',login,require('../controller/users/index').bind({db})) ; 

	
	// Retourne de tout les route indiqué a la base du serveur pour le crée ensuite sur express js
	return new Promise<boolean>( resolve => resolve( true ));

} 