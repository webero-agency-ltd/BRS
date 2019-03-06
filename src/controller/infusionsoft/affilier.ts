
import { Request , Response }  from 'express' ; 

import { find } from '../../lib/tags';

import { tagPageOption , infusionTag } from '../../interface/tagPageOption';

import { filter } from '../../lib/filter'

const Mustache = require( 'mustache' ) ; 

import { DbInterface } from '../../interface/DbInterface';

import { ProduitAttributes } from '../../models/produit';

//récupération de tout les produit pour faire une comparaision
let allproduct = function ( Produit ) : Promise<ProduitAttributes[]>{

 	return new Promise<ProduitAttributes[]>( (resolve) => { 
 		//Récupération des informations de produit 
		Produit.findAll()

		.then(produits => {
		  	return resolve( produits ) ; 
		})
 		
 		.catch( e => resolve( [] ) )

	});	

}

let findTagInfo = function ( tags : infusionTag[] , id : number ) {

	let tag = null ;

	for( let i of tags ){
		if ( i.id == id ) {
			tag = i ;
			break
		}
	}

	return tag ;

}

//cette fonction ajoute les informations suplémentaire d'un utilisateur 
// ex : le tag d'un produit a la quel il appartienne ect 
let userComp = function ( users : any , tags : infusionTag[] , produits : ProduitAttributes[] ) {

	let keys = Object.keys( users ) ; 
	let newuser = {}
	for(let d of keys ){
		newuser[d] = { ...users[d] };
		users[d]['tags'].forEach(e=>{
			let info = findTagInfo( tags , e['id'] as number ) ; 
			for(let p of produits ){
				let { name , prixLv1 , prixLv2 , tag } = p ; 
				if ( info['name'].search( tag ) !== -1 ) {
					let prix = prixLv1
					let type = 'Level 1';
					if ( info['name'].search( 'Lv2' )  !== -1 ) {
						prix = prixLv2 ; 
					 	type = 'Level 2';
					} 
					newuser[d]['info'] = { produit : name , type , prix } ;
				}
			}
		})
	}
	return newuser ;


}

module.exports = async function ( req:Request, res:Response ) {

	let { Produit } = this.db as DbInterface ;

	//initialisation ou récupération des donner infusion soft 
	if ( ! req.ifstInitToken() ) 
		//dans ce cas ci le token n'existe pas dans ou expiré infusionsoft
		return res.response([],403) ; 

	let id = req.query.id ; 

	let username = req.user.family_name + '' + req.user.given_name ; 

	let data = await find() as tagPageOption ;

	//s'il ny a pas de configuration alors on n'affiche rien
	if ( Object.keys( data ).length == 0 ) {
		return res.response([],200) ;
	}

	let tagsName : string[] = [] ; 

	tagsName = data.tags.map((e)=>{
		return Mustache.render( e.text , { username }) ;
	}) as [] ; 

	//ici on a les différent tag et on veut récupéré les ID de chaque tag
	let resTag = await req.infusionsoft.tags() as object ;
	let tags = [] ;  

	//s'il ny a pas de tag a afficher 
	if ( !resTag['tags'] || ( resTag['tags'] && resTag['tags'].length == 0) ) {
		return res.response([],200) ;
	}

	let r : infusionTag[] = resTag['tags'] ; 
	//on récupére ici les tag qui correspond a cella dans la page d'édition
	tags = r.filter((e)=>{
		if ( tagsName.indexOf( e.name ) !== -1 && parseInt(data.option) !== 1 ) {
			return true;
		}else if ( tagsName.indexOf( e.name ) == -1 && parseInt(data.option) == 1 ){
			return true;
		}
		return  false ;
	}); 

	//si le tag a afficher n'existe pas 
	if ( tags.length == 0 ) {
		return res.response([],200) ;
	}

	//ici on a les informations du tag a faire des recherche 
	//on fait alors la recherche des contacts de chaque tag dans le paramètre
	let affiliers = await req.infusionsoft.affilier( tags ) ;

	//Ici on a les différent résultat, on fait le trie en fonction des condition maitenant 
	let finale = await filter( affiliers , data.option , tags ) ; 

	let allproduit = await allproduct( Produit ) ; 

	let users = userComp( finale['users'] , tags , allproduit ) ;  

	return res.response( { users , tags : finale['tags'] } ,200) ;
 
};
