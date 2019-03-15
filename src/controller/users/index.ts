
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../../interface/DbInterface';

module.exports = function  ( req:Request, res:Response ) {
	
	let { User } = this.db as DbInterface ;

	User.findAll({where: {
      	role: 'user',
    }})

	.then(User => {
	  	res.response( User , 200)
	})
	
	.catch( e => res.response( [] , 200) )
	
};
   