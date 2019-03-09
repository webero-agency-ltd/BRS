
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../../interface/DbInterface';

module.exports = function  ( req:Request, res:Response ) {

	let { Tagsearch } = this.db as DbInterface ;
	let { textTag , valueTag } = req.body ;  

	Tagsearch.create({ textTag , valueTag })
		.then(tag => {
		  	res.response( tag , 200)
		})
		.catch( e => res.response( {} , 200) )

};
  