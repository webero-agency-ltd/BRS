 
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../../interface/DbInterface';

module.exports = function  ( req:Request, res:Response ) {

	let { Attache } = this.db as DbInterface ;

	let user_id = 1 ; 
	let	type = 'produit/price'; 
	let	attachable_id = user_id ;
	let	attacha_id = req.body.id ;
	let text = req.body.price ;  

	Attache.find({ where : {
		type ,
		attachable_id , 
		attacha_id ,
		
	}})

	.then(atc => {
	  	
	  	if (atc) {
	  		//on fait la mise a jour du prix de s'il existe  
	  		return atc.update({
		        	text
		      	})
		      	.then(price => {
		      		res.response({price},200);
				})
				.catch( e => res.json({}) );
	  	}

	  	//on le crée s'il n'exsite pas 
	  	Attache.create({type,attachable_id,text,attacha_id})
			.then(a => {
			  	res.response( a , 200)
			})
			.catch( e => res.response( {} , 200) )
				
	})
	
	.catch( e => res.response({},200) )

};
  