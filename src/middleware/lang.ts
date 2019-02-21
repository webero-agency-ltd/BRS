
import { Request , Response , NextFunction }  from 'express' ; 

module.exports = function ( req : Request , res : Response , next : NextFunction ) {

	let local = 'fr' ; 
	//récupération des la langue dans la page qui convienne 
	req.lang = function ( data : string ) {
		try {
			let lang : object = require('../resources/lang/'+local+'/'+data) ; 
			if( Object.keys(lang).length>0)
		    	return res.locals.lang = Object.assign({},lang,res.locals.lang) ;
		}
		catch (e) {
		    return  {};
		}
	};

  	next();
	
} 