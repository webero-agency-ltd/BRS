
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../../interface/DbInterface';

module.exports = function  ( req:Request, res:Response ) {

	let { Config } = this.db as DbInterface ; 

	let { name , value } = req.body  ; 

	//créaton de tag s'il n'existe pas et création s'il existe 

	Config.find({ where: { name } })
    	
    	.then(c => {
    		if (c) {
		      	return c.update({ value })  	
		      	.then(token => {
		      		res.response({ name , value },200);
				})
				.catch( e => res.response( {error:true} , 200 ) );
		    }
		    //création du config s'il n'existe pas 
		  	Config.create({ name,value })
				.then(c => {
				  	res.response( c , 200)
				})
				.catch( e => res.response( {error:true} , 200) )
		
		})
		
		.catch( e => res.response( {success:true} , 200 ) );

};
