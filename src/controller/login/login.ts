
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../../interface/DbInterface';

module.exports = function  ( req:Request, res:Response ) {

	let { User } = this.db as DbInterface ;

	//ici on veut se souvenire de l'utilisateur lors de la prochaine connexion 
	if ( req.body.remember ) {

		var randomNumber=Math.random().toString();
	    randomNumber=randomNumber.substring(2,randomNumber.length);
	    //mise a jours de l'utilisateur et enregistrement du remember token dans ca table de base de donner 
	    User.find({ where: { id: req.user.id } })
	    	.then(U => {
	    		if (U) {
			      	return U.update({
			        	rememberToken: randomNumber
			      	})
			      	.then(token => {
			      		res.cookie('rememberToken', randomNumber , {maxAge : 9999 * 24 * 30 }) 
			      		res.json({success:true});
					})
					.catch( e => res.json({success:true}) );
			    }
			  	res.json({success:true});
			})
			.catch( e => res.json({success:true}) );

	}else{
		res.json({success:true});
	}
    
};
