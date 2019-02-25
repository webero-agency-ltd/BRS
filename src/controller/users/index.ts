
import { Request , Response }  from 'express' ; 

let User = require('../../models/user') 

module.exports = function  ( req:Request, res:Response ) {

	let test = { name  : 'ANDRIAMIHAHA'} ; 
	User().create( test )
        .then(user => res.response(user,200))

};
  