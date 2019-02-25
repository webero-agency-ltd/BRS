
const costvalidate = require( 'validate.js' ) ; 

import { Request , Response , NextFunction }  from 'express' ; 

module.exports = function ( req : Request , res : Response , next : NextFunction ) {
	
	let constraints = require( './' + this.rull ) ;
			
	let checked = costvalidate( req.body , constraints ) ; 

	if ( Object.keys( checked ).length > 0 ) {
		return res.response( checked , 400 ) 
	}else{
		return next();
	}

};
