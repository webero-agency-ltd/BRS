import * as bcrypt from 'bcrypt' ;

export default function hash( pass ) : Promise <string> {
	
	return new Promise<string>( async (resolve) => { 
		bcrypt.hash( pass , 10 , (err, hash) => { 
			resolve( hash )
		})
	});

}
