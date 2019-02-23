
import { Request , Response }  from 'express' ; 

module.exports = function  ( req:Request, res:Response ) {

	//récupération des fichers langue du login
	req.lang('admin') ; 

	//initialisation des infusionsoft
	req.ifstInitToken() ; 

	//affichage du render de la page admin  
	res.render('admin.ejs',{lang :  JSON.stringify( res.locals.lang ) })  

};
