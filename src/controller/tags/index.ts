
import { Request , Response }  from 'express' ; 

import { find } from '../../lib/tags'

import { DbInterface } from '../../interface/DbInterface';


module.exports = async function ( req:Request, res:Response ) {

	let { Tag } = this.db as DbInterface ;

	let data = await find() ;

	Tag.findAll({where: {
      	page_id: req.query.page_id
    }})

	.then(tag => {
	  	res.response( tag , 200)
	})
	
	.catch( e => res.response( [] , 200) )

};
