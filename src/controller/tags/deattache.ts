
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../../interface/DbInterface';

module.exports = function  ( req:Request, res:Response ) {

	let { Attache } = this.db as DbInterface ; 

	let	type = 'tag/page/search';
	let	attachable_id =  req.user.id ;
	let	attacha_id = req.body.id ;

	Attache.destroy({
	    where: {
	      	type,
	      	attachable_id,
	      	attacha_id,
	    }
	})

	.then(x => {
	  	res.response( { success : true } , 200)
	})

	.catch( e => {
		res.response( {} , 200) 
	});


};
