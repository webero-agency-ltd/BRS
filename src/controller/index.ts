
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../interface/DbInterface';

const passport = require('passport')

module.exports = function ( req:Request, res:Response ) {

	//voire si un utilisateur est connecté 
	if (!req.isUser()) {
		//s'il ny a pas alors on redirige vers la page login
        return res.redirect('/login');
    }else if(req.user&&req.user.role=='admin'){
    	//si l'utilisateur est connecté et qu'il est un administrateur 
        return res.redirect('/admin');
    }

	let { User } = this.db as DbInterface ; 

	//récupération des fichers langue du login
	let lang = req.lang('app') ; 
	 
	//initialisation des infusionsoft
	if ( ! req.ifstInitToken() ) 
		//dans ce cas ci le token n'existe pas dans ou expiré infusionsoft
		res.locals.erreur = lang['erreur_token'] ; 
	
	res.render('index.ejs',{ lang:JSON.stringify(res.locals.lang) }) 
 
};
