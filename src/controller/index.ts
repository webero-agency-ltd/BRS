
import { Request , Response }  from 'express' ; 

module.exports = function  ( req:Request, res:Response ) {

	//récupération des fichers langue du login
	let lang = req.lang('login') ; 
	
	//initialisation des infusionsoft
	if ( ! req.ifstInitToken() ) 
		//dans ce cas ci le token n'existe pas dans ou expiré infusionsoft
		res.locals.erreur = lang['erreur_token'] ; 
	

	res.render('index.ejs') 

};
