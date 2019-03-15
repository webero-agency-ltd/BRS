
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../../interface/DbInterface';

module.exports = function  ( req:Request, res:Response ) {

	let { Attache } = this.db as DbInterface ;

	let user_id = 1 ; 
	let	type = 'produit/price'; 
	let	attachable_id = user_id ; 

	Attache.destroy({ where : {
		type ,
		attachable_id ,  
	}})

	.then(atc => {
	  	res.response({success:true},200)
	})
	
	.catch( e => res.response({},200) )

};
  