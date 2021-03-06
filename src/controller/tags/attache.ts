
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../../interface/DbInterface';

module.exports = function  ( req:Request, res:Response ) {

	let { Attache } = this.db as DbInterface ; 

	let	type = 'tag/page/search'; 
	let	attachable_id = req.user.id ;
	let	attacha_id = req.body.id ;

	//Selection de l'attachement s'il existe 
	//s'il n'existe pas, on le crée 
	Attache.find({ where : {
		type ,
		attachable_id , 
		attacha_id 
	}})

	.then(atc => {
	  	
	  	if (atc) {
	  		return res.response( atc , 200) ;
	  	}

	  	Attache.create({type,attachable_id,attacha_id})
			.then(a => {
			  	res.response( a , 200)
			})
			.catch( e => res.response( {} , 200) )
				
	})
	
	.catch( e => res.response({},200) )


};
