import Store from './Store' ;
import moment from 'moment' ;
import { Moment } from 'moment' ;

import { contacts } from '../interface/contacts' ;
 
export default class contactsStore extends Store {
	
	public contacts : contacts[]

	private page_id : number;

	constructor( page_id ) {

		super() ; 
		this.page_id = page_id ;
		this.contacts = [] ; 
	
	}

	find() : Promise<boolean> {

		return new Promise<boolean>( async (resolve) => { 

			let url = '/affilier?page_id='+this.page_id;

			let response = await fetch( url )

			let data = {} ; 
			let tags : contacts[] = [] ; 

			if ( response.ok ) { 

				data = await response.json() ; 

				console.log( data['tags'] )  ; 

				let usersData = Object.keys( data['users'] ) ; 
				for( let u of usersData ){
					tags = [{
						first_name : data['users'][u]['user']['first_name'] as string,
						id : data['users'][u]['user']['id'] as number ,
						last_name : data['users'][u]['user']['last_name'] as string,
						email : data['users'][u]['user']['email'] as string,
						date : moment(data['users'][u]['tags'][0]['date'] as string, "DD-MM-YYYY") as Moment ,
						payement :  data['users'][u]['user']['payement'] as string,
						...data['users'][u]['info']
					}, ...tags]
				}
		
			}

			this.contacts = tags ; 

			setTimeout(()=>{
				this.alert() ; 
			    resolve( true ) ;
			},1000)
			
		});

	}

}