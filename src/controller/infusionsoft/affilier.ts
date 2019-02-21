
import { Request , Response }  from 'express' ; 

module.exports = async function ( req:Request, res:Response ) {

	//initialisation ou récupération des donner infusion soft 
	if ( ! req.ifstInitToken() ) 
		//dans ce cas ci le token n'existe pas dans ou expiré infusionsoft
		return res.response([],403) ; 

	let id = req.query.id ; 

	let ursename = 'Jean_Pierre' ; 
	
	let data = await req.infusionsoft.tags( id ) ; 

	res.response(data,200) ;

};
