
import { Request , Response , NextFunction }  from 'express' ; 

module.exports = function ( req : Request , res : Response , next : NextFunction ) {

	let local = 'fr' ; 
	//récupération des la langue dans la page qui convienne 
	res.response = function ( data : object , code : number = 200 ) {
		res.setHeader('Content-Type', 'application/json');
    	res.status( code ).send(JSON.stringify( data ));
	};

  	next();
	
} 