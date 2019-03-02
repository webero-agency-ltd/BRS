
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../interface/DbInterface';

const passport = require('passport')

module.exports = function ( req:Request, res:Response ) {

	let { User } = this.db as DbInterface ; 

	//récupération des fichers langue du login
	let lang = req.lang('login') ; 
	
	//initialisation des infusionsoft
	if ( ! req.ifstInitToken() ) 
		//dans ce cas ci le token n'existe pas dans ou expiré infusionsoft
		res.locals.erreur = lang['erreur_token'] ; 
	
	res.render('index.ejs') 

};
