
import { Request , Response }  from 'express' ; 

import { tagPageOption , infusionTag } from '../../interface/tagPageOption';

import { filter } from '../../lib/filter'
import { ConfigInstance , ConfigAttributes } from '../../models/config'

import { TagAttributes } from '../../models/tag'

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
let userComp = function ( users : any , tags : infusionTag[] , produits : ProduitAttributes[] , lang : any ) {

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
					let type = lang['level1'];
					let payement = '' ; 

					if ( info['name'].search( 'Lv2' )  !== -1 ) {
						prix = prixLv2 ; 
					 	type = lang['level2'];
					} 
					if ( info['name'].search( 'Pas_Encore_Paye' )  !== -1 ) { 
					 	payement = lang['commition_pas_encore_paye'];
					} 
					if ( info['name'].search( 'En_Cours' )  !== -1 ) { 
					 	payement = lang['commition_en_Cours'];
					} 
					if ( info['name'].search( 'Paye' )  !== -1 ) { 
					 	payement = lang['commition_paye'];
					}  
					newuser[d]['info'] = { produit : name , type , prix , payement } ;
				}
			}
		})
	}
	return newuser ;


}

let findTag = async function ( Tag , page ) {

	return new Promise<TagAttributes[]>( (resolve) => { 
 		
 		Tag.findAll({where: {
	      	page_id: page ,
	    }})   

		.then(tag => {
		  	return resolve( tag )
		})
		
		.catch( e => resolve( [] ) )

	});	

}

let findTagPage2 = async function ( Tag , Attache , user_id ) : Promise<TagAttributes[]>{

	return new Promise<TagAttributes[]>( (resolve) => { 

		let	type = 'tag/page/search';
		let	attachable_id = user_id ;

		Attache.findAll({ where : {
			type ,
			attachable_id , 
		}})

		.then(async atc => {
		  	
		  	if (atc) {
		  		//récupération des tags qui correspond a l'attachement 
		  		let id = [] ; 
				for( let t of atc ){
					id.push( t.attacha_id ) 
				}
				
				return Tag.findAll({
					where: { id }
				})
					
				.then( atc => {
					resolve( atc )
				})
				
				.catch( e => resolve([]) )

		  	}
		  	resolve([]) ;
					
		})
		
		.catch( e => resolve([]) )

	});	

}

/*
*	Récuparation es config
*/
let config = async function ( Config , name ) {
	
	return new Promise<string>( (resolve) => { 

		Config.find({where:{name}})

		.then(conf => {
			if ( conf ) {
		  		return resolve( conf.value )
			}
		  	resolve( null )
		})
		
		.catch( e => resolve( null ) )

	});	

}

module.exports = async function ( req:Request, res:Response ) {
	 
	let lang = req.lang('app') ; 

	let { Produit , Tag , Config , Attache } = this.db as DbInterface ;

	//initialisation ou récupération des donner infusion soft 
	if ( ! req.ifstInitToken() ) 
		//dans ce cas ci le token n'existe pas dans ou expiré infusionsoft
		return res.response([],403) ; 

	let id = req.query.id ; 

	let username = req.user.family_name + '_' + req.user.given_name ; 

	let data : TagAttributes[] = []; 

	let option = '3' ;

	if ( parseInt(req.query.page_id) == 1 ) {
		let rull = await config( Config , 'rull' )  ; 
		option = rull ? rull : '3' ;
		data = await findTag( Tag , req.query.page_id ) ;
	}else if ( parseInt(req.query.page_id) == 2 ) {
		data = await findTagPage2( Tag , Attache , req.user.id )
	}

	//s'il ny a pas de configuration alors on n'affiche rien
	if ( data.length == 0 ) {
		return res.response({error:true},403) ;
	}

	let tagsName : string[] = [] ;  

	tagsName = data.map((e)=>{
		return Mustache.render( e.value , { username }) ;
	}) as [] ; 
	
	//ici on a les différent tag et on veut récupéré les ID de chaque tag
	let resTag = await req.infusionsoft.tags() as object ;
	let tags = [] ;
 
	//s'il ny a pas de tag a afficher 
	if ( !resTag['tags'] || ( resTag['tags'] && resTag['tags'].length == 0) ) {
		return res.response({ users : [] , tags : [] },200) ;
	}

	let r : infusionTag[] = resTag['tags'] ; 
	//on récupére ici les tag qui correspond a cella dans la page d'édition
	tags = r.filter((e)=>{
		if ( tagsName.indexOf( e.name ) !== -1 && parseInt(option) !== 1 ) {
			return true;
		}else if ( tagsName.indexOf( e.name ) == -1 && parseInt(option) == 1 ){
			return true;
		}
		return  false ;
	}); 

	//si le tag a afficher n'existe pas 
	if ( tags.length == 0 ) {
		return res.response({ users : [] , tags : [] } ,200) ;
	}

	//ici on a les informations du tag a faire des recherche 
	//on fait alors la recherche des contacts de chaque tag dans le paramètre
	let affiliers = await req.infusionsoft.affilier( tags ) ;

	//Ici on a les différent résultat, on fait le trie en fonction des condition maitenant 
	let finale = await filter( affiliers , option , tags ) ; 

	let allproduit = await allproduct( Produit ) ; 

	let users = userComp( finale['users'] , tags , allproduit , lang ) ;  

	return res.response( { users , tags : finale['tags'] } ,200) ; 

};
