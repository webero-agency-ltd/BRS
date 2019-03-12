
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../../interface/DbInterface';

module.exports = function  ( req:Request, res:Response ) {

	let { Produit } = this.db as DbInterface ;
	
	Produit.findAll()

	.then(produit => {
	  	res.response( produit , 200)
	})
	
	.catch( e => res.response( [] , 200) )

};
   