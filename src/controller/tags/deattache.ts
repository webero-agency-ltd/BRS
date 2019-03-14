
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../../interface/DbInterface';

module.exports = function  ( req:Request, res:Response ) {

	let { Attache } = this.db as DbInterface ; 

	//@todo: A changer par l'ID de l'utilisateur qui est connecté 
	let user_id = 1 ; 
	let	type = 'tag/page/search';
	let	attachable_id = user_id ;
	let	attacha_id = req.body.id ;

	Attache.destroy({
	    where: {
	      	type,
	      	attachable_id,
	      	attacha_id,
	    }
	})

	.then(x => {
	  	res.response( { success : true } , 200)
	})

	.catch( e => {
		res.response( {} , 200) 
	});


};
