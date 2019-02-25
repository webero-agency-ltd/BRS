
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../../../interface/DbInterface';

module.exports = function  ( req:Request, res:Response ) {

	let { Produit } = this.db as DbInterface ;
	let { name , prixLv1 , prixLv2 , tag } = req.body ;  

	Produit.create({name,prixLv1,prixLv2,tag})
		.then(produit => {
		  	res.response( produit , 200)
		})
		.catch( e => res.response( {} , 200) )

};
  