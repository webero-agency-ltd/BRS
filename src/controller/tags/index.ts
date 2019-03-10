
import { Request , Response }  from 'express' ; 

import { find } from '../../lib/tags'

module.exports = async function ( req:Request, res:Response ) {

	let data = await find() ;

	res.response( data ,200) ;

};
