
import { Request , Response }  from 'express' ; 

import { find } from '../../lib/tags'

import { DbInterface } from '../../interface/DbInterface';


module.exports = async function ( req:Request, res:Response ) {

	let { Tag } = this.db as DbInterface ;

	console.log( req.body.id ) ;
	Tag.destroy({
	    where: {
	      	id: req.body.id 
	    }
	})

	.then(x => {
	  	res.response( { success : true } , 200)
	})

	.catch( e => {
		console.log( e )
		res.response( {} , 200) 
	});

};