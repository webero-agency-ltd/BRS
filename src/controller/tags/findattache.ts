
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../../interface/DbInterface';

/*
*	Récupération de la liste de tags 
*/
let findTags = async function ( tags , bdd ) : Promise<object[]> {

	return new Promise<object[]>( (resolve) => { 

		let id = [] ; 
		for( let t of tags ){
			id.push( t.attacha_id ) 
		}
		
		bdd.findAll({
			where: { id }
		})
			
		.then( atc => {
			resolve( atc )
		})
		
		.catch( e => resolve([]) )

	});

}

module.exports = async function ( req:Request, res:Response ) {

	let { Attache , Tag } = this.db as DbInterface ; 



	//@todo: A changer par l'ID de l'utilisateur qui est connecté 
	let user_id = 1 ; 
	let	type = 'tag/page/search';
	let	attachable_id = user_id ;


	Attache.findAll({ where : {
		type ,
		attachable_id , 
	}})

	.then(async atc => {
	  	
	  	if (atc) {
	  		//récupération des tags qui correspond a l'attachement 
	  		let tags  = await findTags( atc , Tag )
	  		return res.response( tags , 200) ;
	  	}
	  	res.response([], 200) ;
				
	})
	
	.catch( e => res.response([],200) )


};
