
import app from '../route'  ; 
import { typeRouter } from '../interface/typerouter';

export default async function () : Promise<typeRouter[]> {

	//ICI on ajoute tout les routes de l'applications 

	await app.get('/','index') ;

	await app.get('/login','login') ; 
	
	await app.get('/sinup','sinup') ; 

	//route administrateur 
	await app.get('/admin','admin/index') ; 

	// admin ajoute de tag et 
	await app.get('/admin/tags','admin/tags/find') ; 

	await app.post('/admin/tags','admin/tags/create'); //.validate('user') 

	await app.get('/token','ifstToken') ; 

	/*
	*	Récupération Affilier des utilisateur
	*/
	await app.get('/affilier','infusionsoft/affilier') ; 


	//Route des utilisateurs de l'application 
	await app.get('/user','users/index') ; 

	
	// Retourne de tout les route indiqué a la base du serveur pour le crée ensuite sur express js
	return new Promise<typeRouter[]>( resolve => resolve( app.verbe ));

} 