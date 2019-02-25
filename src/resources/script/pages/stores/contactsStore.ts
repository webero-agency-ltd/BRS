

import { contacts } from '../interface/contacts' ;

declare type ChangeCallback = ( store : contactsStore ) => void 

export default class contactsStore  {
	
	public contacts : contacts[]

	private callback : ChangeCallback[] = [] ; 

	private static i : number  = 0; 

	static increment(){

		if (this.i===null) {
			this.i = 0  ; 
		}
		return this.i++;
	
	}

	constructor() {
		
		this.contacts = [] ; 

	}

	onChange( cbl : ChangeCallback){
		
		this.callback.push( cbl ) ; 

	}

	/*
	*	Alerté les composante qu'il y a des changements 
	*/

	alert(){
		this.callback.forEach( cbl => cbl( this ) ) ; 
	}

	find() : Promise<string> {

		return new Promise<string>( async (resolve) => { 

			let url = '/affilier';

			let response = await fetch( url )

			let data = {} ; 
			let tags : contacts[] = [] ; 
			let option : string = '1' ;

			if ( response.ok ) { 
				data = await response.json() ; 

				console.log( data ) ; 

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

			return resolve( option ) ;
			
		});

	}

}