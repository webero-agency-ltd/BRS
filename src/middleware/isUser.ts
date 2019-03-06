
import { Request , Response , NextFunction }  from 'express' ; 

module.exports = function ( req : Request , res : Response , next : NextFunction ) {

	/*
	*	cette fonction retourne true si un utilisateur est connecté 
	* 	s'il y a un paramètre object role et que l'utilisateur est connecté, 
	*  	on vérifie aussi que le rôle de l'utilisateur correspond 
	*/
	req.isUser = function ( data : object ) {
	
		if (req.user && (!data || (data && data['role'] == req.user.role))) {
	        return true;
	    } else {
	        return false;
	    }

	};

  	next();
	
} 