
import { Request , Response }  from 'express' ; 

import Mail from "../../lib/email"

module.exports = function  ( req:Request, res:Response ) {
	
	//récupération des fichers langue du login
	req.lang('forgot') ; 
	res.locals.rememberToken = req.cookies.rememberToken ; 
	//affichage du render du login 
	res.render('forgot.ejs') 

}; 
