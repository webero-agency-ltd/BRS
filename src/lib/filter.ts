
const path = require('path') ; 

import { infusionTag } from '../interface/tagPageOption';

export let filter = function ( data : any , option : string , tags : infusionTag[] ) : Promise <object> { 

	return new Promise<object>( (resolve) => { 

		if ( parseInt( option ) == 1 ) {
			return resolve( data ) ; 
		}
		else if ( parseInt( option ) == 2 ) {

			//les id des tags qui son afficher 
			let tagsID : number[] =  Object.keys(tags).map( e => tags[e].id ) ; 

			let users = Object.keys(data.users).filter((e) => {
				let tags = data.users[e].tags.filter((e)=>{ 
					return tagsID.includes(e.id); 
				})
				return tags.length == data.users[e] ? true : false ;
			}) 

			return resolve( {users : {... users } ,tags:{...data.tags}} ) ; 
		}
		return resolve( data ) ; 

	});

}