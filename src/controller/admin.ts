
import { Request , Response }  from 'express' ; 

module.exports = function  ( req:Request, res:Response ) {
 
	//récupération des fichers langue du login
	req.lang('app') ; 
	req.lang('form') ; 

	//voire si un utilisateur est connecté 
	if (!req.isUser({role:'admin'})) {
		//s'il ny a pas alors on redirige vers la page login
        return res.redirect('/login');;
    }

	//initialisation des infusionsoft
	req.ifstInitToken() ; 
 
	//affichage du render de la page admin  
	res.render('admin.ejs',{ lang:JSON.stringify(res.locals.lang) })  

};
