
import { typeRouter } from '../interface/typerouter';

import { Express ,  Application }  from 'express' ; 

import { DbInterface } from '../interface/DbInterface';

const passport = require('passport');

const validator = require("../request/"); 

/*
*	S'il ny a pas d'utilisateur connecté, on retourne une erreur  
*/
function loggedIn(req, res, next) {

    if (req.user) {
        next();
    } else {
        res.json({authorized:false},401);
    }

}

/*
*	Si l'utilisateur est connecté, on le redirige vers la page home 
*/
function guard(req, res, next) {

	if( req.user && req.role =='admin'){
        res.redirect('/admin');
	}
	else if (req.user) {
        res.redirect('/');
    } else {
        next();
    }
 
}

//NOTE : si on veut utiliser une validation de donnée dans une route en particulier
//on utilise validator.bind({rull:'xxx'}) comme deuxième ou troisième paramètre
//de la fonction app.verbe (ex app.get('/login',validator.bind({rull:'xxx'}),require('../controller/www').bind({db}))  )
//ici dans ce cas, xxx doivent correspondre a un nom de fichier dans /src/request/xxx.ts
//et qui contiens les règles de validation 

module.exports = async function ( app : Application , db : DbInterface ) : Promise<boolean> {

	//a partir d'ici, on ajoute tout les routes de l'applications 

	//route home de l'application, si l'utilisateur n'est pas connecté, alors on le redirige vers la page login 
	app.get('/',require('../controller/index').bind({db})) ;

	/****************************************************************
	*	Route des authentiffication utilisateur 
	****************************************************************/
	app.get('/login',guard,require('../controller/login/').bind({db})) ; 

	app.post('/login',function (req, res, next) {
	
		//si un utilisateur a un remember token lors de la connexion 
		if ( req.cookies.rememberToken ) {
			req.body['rememberToken'] = req.cookies.rememberToken; 
			passport.authenticate('token-local')(req, res, next);
		}else if (req.method == "POST"){
			passport.authenticate('local')(req, res, next);
		}else{
			next() ; 
		}

	},require('../controller/login/login').bind({db}) );

	app.get('/sinup',guard,require('../controller/sinup/').bind({db})) ; 

	app.post('/sinup',validator.bind({rull:'sinup'}),require('../controller/sinup/sinup').bind({db})) ; 
	
	app.get('/logout', function(req, res){
		//destruction de cookie rememberToken  
		res.clearCookie("rememberToken");
	  	req.logout();
	  	res.redirect('/');
	});
	/****************************************************************/


	/****************************************************************
	*	Route des tag de l'applications  
	****************************************************************/
	app.get('/tags',validator.bind({rull:''}),require('../controller/tags/').bind({db})) ; 
	app.post('/tags',require('../controller/tags/create').bind({db})); 
	app.delete('/tags',require('../controller/tags/delete').bind({db})); 
	/****************************************************************/


	/****************************************************************
	*	Route des la config de l'application  
	****************************************************************/
	app.get('/config',validator.bind({rull:''}),require('../controller/config/').bind({db})) ; 
	app.post('/config',require('../controller/config/edite').bind({db})); 
	/****************************************************************/


	/****************************************************************
	*	Route des produits de l'applications   
	****************************************************************/
	//les différent route du produit
	app.get('/admin/produit',require('../controller/produit/index').bind({db})) ; 
	app.post('/admin/produit',validator.bind({rull:'produitCreate'}),require('../controller/produit/create').bind({db})) ;
	app.put('/admin/produit',validator.bind({rull:'produitUpdate'}),require('../controller/produit/update').bind({db})) ; /*.validate('produitUpdate') ;*/
	app.delete('/admin/produit',require('../controller/produit/delete').bind({db}));
	/****************************************************************/



	/****************************************************************
	*	Route des l'administrateur de l'application 
	****************************************************************/
	app.get('/admin',require('../controller/admin').bind({db})) ; 
	app.get('/token',require('../controller/ifstToken').bind({db})) ; 
	/****************************************************************/

	/*
	*	Récupération Affilier des utilisateur
	*/
	app.get('/affilier',require('../controller/infusionsoft/affilier').bind({db})) ;  

	//Route des utilisateurs de l'application 
	app.get('/user',require('../controller/users/index').bind({db})) ; 
	
	// Retourne de tout les route indiqué a la base du serveur pour le crée ensuite sur express js
	return new Promise<boolean>( resolve => resolve( true ));

} 