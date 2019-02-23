
const path = require('path') ; 

let file = path.join(__dirname,'../config/tags.json')  ;

const fs = require('fs');

export let set = function ( data : object , cbl : CallableFunction ) {

	fs.writeFile( file , JSON.stringify( data ), 'utf8', (err)=>{
		if (err)
			cbl( false ) ; 
		cbl( true ) ; 
	});

}


export let find = function () : Promise <object> {

	return new Promise<object>( (resolve) => { 

		if (fs.existsSync( file )) {
			let token = fs.readFileSync( file ).toString() ;
			if ( Object.keys( token ).length>0 ) {
				return resolve( JSON.parse( token ) ) ;
			}
		}
		return resolve( {} ) ; 

	});


}