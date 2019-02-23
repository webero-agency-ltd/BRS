
import { Request , Response , NextFunction }  from 'express' ; 
import { configSite } from '../interface/configSite';
import { sdkifst } from '../interface/sdkifst';

const infusionsoft = require('../lib/infusionsoft')
const config : configSite = require('../config/site')

module.exports = function ( req : Request , res : Response , next : NextFunction ) {

	let lang = req.lang('app') ; 

	//initialisation de la class infusionsoft
	let sdk : sdkifst = new infusionsoft( config ) ; 

	req.infusionsoft = sdk ; 

	req.ifstInitToken = function () {

		let token = sdk.getToken() ; 
		res.locals.urlFindToken = sdk.getUrlAuht() ;
 
		if ( Object.keys( token ).length > 0 ) {
			res.locals.ifstToken = token ; 
			res.locals.erreur = false ; 
			return true ;
		}
		res.locals.erreur = true ; 
		res.locals.ifstToken = false ; 
		return false ;
	
	};


	req.ifstFindToken = async function ( data : string ) {

		//si je jeton n'existe pas alors on redirige l'utilisateur 
		let ready = await sdk.initToken( data ) ;
		if ( ! ready ) {
			res.locals.erreur = lang['erreur_token_admin'] ; 
			return false ;
		}
		return true;
	
	};

  	next();
	
} 