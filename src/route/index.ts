
import app from '../route'  ; 
import { typeRouter } from '../interface/typerouter';

export default async function () : Promise<typeRouter[]> {

	//ICI on ajoute tout les routes de l'applications 

	await app.get('/','index') ;

	await app.get('/login','login') ; 
	
	await app.get('/sinup','sinup') ; 

	//route administrateur 
	await app.get('/admin','admin') ; 

	await app.get('/token','ifstToken') ; 

	/*
	*	Récupération Affilier des utilisateur
	*/
	await app.get('/affilier','infusionsoft/affilier') ; 
	
	// Retourne de tout les route indiqué a la base du serveur pour le crée ensuite sur express js
	return new Promise<typeRouter[]>( resolve => resolve( app.verbe ));

} 