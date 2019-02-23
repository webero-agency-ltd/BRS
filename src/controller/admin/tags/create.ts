
import { Request , Response }  from 'express' ; 

import { set } from '../../../lib/tags'

module.exports = function  ( req:Request, res:Response ) {

	let tags = req.body.tags  ; 
	let option = req.body.option  ;

	return set( Object.assign({} , { option,tags }) , ( data )=>{
		if ( data ) {
			return res.response( { success : true } ,200) ;
		}
		return res.response( { error : true } ,400) ;
	})


};
