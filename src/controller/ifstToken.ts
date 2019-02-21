
import { Request , Response }  from 'express' ; 

//traitement de la redirection apres l'authentification dans infusionsoft
module.exports = function  ( req:Request, res:Response ) {

	let code = req.query.code ; 

	req.lang('admin') ; 

	req.ifstFindToken( code ) ; 
	
	//Redirection vers la page administration pour afficher si le token et ok ou il faut refaire 
	res.redirect('/admin');

};
