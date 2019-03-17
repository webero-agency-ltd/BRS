
import { Request , Response }  from 'express' ; 

import Mail from "../../lib/email"

import { DbInterface } from '../../interface/DbInterface';

import hash from '../../lib/hash' ;

module.exports = async function ( req:Request, res:Response ) {

	let lang = req.lang('forgot') ;

	let { User } = this.db as DbInterface ;

	let email = req.body.email ;

	let randomstring = Math.random().toString(36).slice(-8);

	console.log( randomstring ) ; 

	let password = await hash( randomstring ) ; 

	User.find({ where:{email} })
    	.then(u => {
    		if (u) {
		      	return u.update({ password })
		      	.then( async token => {
		      		Mail.to = email ;
				    Mail.subject = lang['email_sujetct'] ;
				    Mail.message = 'forgot.ejs';
				    Mail.data = { password : randomstring , ...lang};
				    let result = await Mail.sendMail(); 
				    if ( result ) {
				    	res.json({success:true});
				    }else{
				    	res.json({error:true});
				    }
				})
				.catch( e => res.json({error:true}) );
		    }
		  	res.json({error:true});
		})
		.catch( e => res.json({error:true}) );

}; 
