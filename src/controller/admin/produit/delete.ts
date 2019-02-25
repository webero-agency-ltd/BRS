
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../../../interface/DbInterface';

module.exports = function  ( req:Request, res:Response ) {

	let { Produit } = this.db as DbInterface ;

	Produit.destroy({
	    where: {
	      	id: req.body.id
	    }
	})

	.then(produit => {
	  	res.response( { success : true } , 200)
	})

	.catch( e => res.response( {} , 200) );

};
   