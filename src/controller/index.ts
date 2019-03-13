
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../interface/DbInterface';

const passport = require('passport')

module.exports = function ( req:Request, res:Response ) {

	//voire si un utilisateur est connecté 
	if (!req.isUser()) {
		//s'il ny a pas alors on redirige vers la page login
        //return res.redirect('/login');
    }

	let { User } = this.db as DbInterface ; 

	//récupération des fichers langue du login
	let lang = req.lang('login') ; 
	
	//initialisation des infusionsoft
	if ( ! req.ifstInitToken() ) 
		//dans ce cas ci le token n'existe pas dans ou expiré infusionsoft
		res.locals.erreur = lang['erreur_token'] ; 
	
	res.render('index.ejs') 

};
