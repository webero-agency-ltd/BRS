
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../../interface/DbInterface';

module.exports = async function ( req:Request, res:Response ) {

	let { Tag } = this.db as DbInterface ;

	Tag.findAll({where: {
      	page_id: req.query.page_id,
      	user_id: 0,
    }})

	.then(tag => {
	  	res.response( tag , 200)
	})
	
	.catch( e => res.response( [] , 200) )

};
