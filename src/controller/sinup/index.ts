
import { Request , Response }  from 'express' ; 

import { User } from '../../interface/User';

module.exports = async function ( req:Request, res:Response ) {

	//récupération des fichers langue du login
	let lang = req.lang('sinup') ; 

	//récupération de l'id infusionsot
	let contactId = parseInt( req.query.contactId ) as number ;
	if ( !contactId ) {
		// il ny a pas de token enfusion soft 
		res.locals.erreur = lang['non_contact_id_error'] as string ;
	}

	if ( ! req.ifstInitToken() ) {
		//@todo : changer en erreur todo
		res.locals.erreur = lang['non_contact_id_error'] as string ;
	} 

	//Récupération des informations de l'ID infusionsoft
	let uI = await req.infusionsoft.user( contactId ) as User ;

	res.render('sinup.ejs',{user : uI }) 

};
  