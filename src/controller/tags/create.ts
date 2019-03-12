
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../../interface/DbInterface';

module.exports = function  ( req:Request, res:Response ) {

	let { Tag } = this.db as DbInterface ; 

	let { name , value , page_id } = req.body  ; 

	Tag.create({name,value,page_id})
		
		.then(tag => {
		  	res.response( tag , 200)
		})

		.catch( e => res.response( {} , 200) )


};
