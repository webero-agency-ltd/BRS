
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../../interface/DbInterface';

module.exports = async function ( req:Request, res:Response ) {

	let { Config } = this.db as DbInterface ;

	Config.find({where: { 
      	name: req.query.name
    }})

	.then(conf => {
	  	res.response( conf , 200)
	})
	
	.catch( e => res.response( null , 200) )

};
