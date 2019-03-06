
import { Request , Response }  from 'express' ; 

import { User } from '../../interface/User';

import { DbInterface } from '../../interface/DbInterface';

import hash from '../../lib/hash' ;

const passport = require('passport') ; 

function Unique( User , contactId ) : Promise <boolean> {

	return new Promise<boolean>( async (resolve) => { 
		User.findOne({ where: {contactId} })
			.then(user => {
				if (user) {
					return resolve( true )
				}
				return resolve( false )
			})
			.catch( e => resolve( false ) )
	});

}

module.exports = async function ( req:Request, res:Response ) {

	//récupération des fichers langue du login
	let lang = req.lang('sinup') 

	let { User } = this.db as DbInterface ; 

	let contactId = req.body.contactId as number ;
	
	//ici on fait d'abord la vérification si l'utilisateur n’a pas encore un compte utilisateur 
	let existe = await Unique( User , contactId ) ;

	if ( existe ) {
		return res.response( {contactId : [lang['duplic_error']]} ,400)
	}  

	if ( req.body.password!==req.body.confpassword) {
		return res.response( {confpassword : [lang['pass_error_conf']]} ,400)
	}

	//ici tout les donner son OK et on récupère les informations de l'ID infusionsoft 
	//pour enfin l'enregistré dans la base de donner
	let uI = await req.infusionsoft.user( contactId ) as User ;

	if ( !uI.id ) {
		return res.response( {} ,500); 
	}

	let family_name = uI['family_name'] ; 
	let given_name = uI['given_name'] ; 
	let email = uI['email_addresses'][0]['email'] ; 
	let password = await hash( req.body.password ) ; 

	if ( !password ) {
		return res.response( {} ,500); 
	}

	User.create({family_name,given_name,email,password,contactId})
		.then(user => {
			res.response( user , 200)
		})
		.catch( e => res.response( {} , 200) )

};
  