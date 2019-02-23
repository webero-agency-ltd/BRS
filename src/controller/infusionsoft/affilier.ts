
import { Request , Response }  from 'express' ; 

import { find } from '../../lib/tags';

import { tagPageOption , infusionTag } from '../../interface/tagPageOption';

import { filter } from '../../lib/filter'

const Mustache = require( 'Mustache' ) ; 

module.exports = async function ( req:Request, res:Response ) {

	//initialisation ou récupération des donner infusion soft 
	if ( ! req.ifstInitToken() ) 
		//dans ce cas ci le token n'existe pas dans ou expiré infusionsoft
		return res.response([],403) ; 

	let id = req.query.id ; 

	let username = 'Janick_Marion' ; 

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
 
	return res.response( finale ,200) ;

};
