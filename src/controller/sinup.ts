
import { Request , Response }  from 'express' ; 

module.exports = function  ( req:Request, res:Response ) {

	//récupération des fichers langue du login
	req.lang('login') ; 
	res.send('Bienvenu dans la page d\'inscrire' ) ; 

};
 