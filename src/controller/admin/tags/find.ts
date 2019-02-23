
import { Request , Response }  from 'express' ; 

import { find } from '../../../lib/tags'

module.exports = function  ( req:Request, res:Response ) {

	return find(( data )=>{
		if ( data ) {
			return res.response( data ,200) ;
		}
		return res.response( {} ,200) ;
	})

};
