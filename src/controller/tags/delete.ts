
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../../interface/DbInterface';


module.exports = async function ( req:Request, res:Response ) {

	let { Tag } = this.db as DbInterface ;

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
