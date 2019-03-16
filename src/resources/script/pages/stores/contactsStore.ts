import Store from './Store' ;

import { contacts } from '../interface/contacts' ;
 
export default class contactsStore extends Store {
	
	public contacts : contacts[]

	constructor() {
		super() ; 
		this.contacts = [] ; 
	}

	find() : Promise<boolean> {

		return new Promise<boolean>( async (resolve) => { 

			let url = '/affilier';

			let response = await fetch( url )

			let data = {} ; 
			let tags : contacts[] = [] ; 

			if ( response.ok ) { 

				data = await response.json() ; 

				let usersData = Object.keys( data['users'] ) ; 
				for( let u of usersData ){
					this.contacts = [{
						first_name : data['users'][u]['user']['first_name'] as string,
						id : data['users'][u]['user']['id'] as number ,
						last_name : data['users'][u]['user']['last_name'] as string,
						email : data['users'][u]['user']['email'] as string,
						...data['users'][u]['info']
					}, ...this.contacts]
				}
				
				setTimeout(()=>{
					this.alert() ; 
				},1000)

			}

			return resolve( true ) ;
			
		});

	}

}