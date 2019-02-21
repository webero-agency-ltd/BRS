
import { Request , Response }  from 'express' ; 

module.exports = function  ( req:Request, res:Response ) {

	//récupération des fichers langue du login
	req.lang('login') ; 
	//affichage du render du login 
	res.render('login.ejs') 

};
