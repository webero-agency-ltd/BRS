
import { Request , Response }  from 'express' ; 

import { DbInterface } from '../../interface/DbInterface';

import { AttacheAttributes } from '../../models/attache';


let findprice = function ( Attache , user_id ) {

	return new Promise<any>( async (resolve) => { 

		let	type = 'produit/price'; 
		let	attachable_id = user_id ;
 
		Attache.findAll({ where : {
			type ,
			attachable_id , 
		}})

		.then(orice => {
			//Récupération des prix du produit pour l'utilisateur s'il existe
		  	resolve( orice )
		})
		
		.catch( e => resolve([]) )
		
	}); 

}

module.exports = async function ( req:Request, res:Response ) {

	let { Produit , Attache } = this.db as DbInterface ;

	let user_id = 1 ; 

	let valprice = {} ; 

	let prices = await findprice( Attache , user_id ) as AttacheAttributes[] ; 

	for( let p of prices ){
		valprice[p.attacha_id]=p.text ; 
	}

	Produit.findAll()

		.then(produit => {
			let ps = []
			//Récupération des prix du produit pour l'utilisateur s'il existe 
			for( let p of produit ){
				let { id , name , prixLv1 , prixLv2 , tag , createdAt , updatedAt } = p ;
				let pi = { id , name , prixLv1 , prixLv2 , tag , createdAt , updatedAt } ;
				if (valprice[p.id]) {
					pi['prixUser'] = valprice[p.id] ; 
				}
				ps.push( pi ) ; 
			}
		  	res.response( ps , 200)
		})
		
		.catch( e => res.response( [] , 200) )

};
   