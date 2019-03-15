
import Store from './Store' ;

import { user } from '../interface/user' ;

export default class userStore extends Store {
	
	public users : user[] ; 

	constructor( ) {
		
		super() ; 
	
	}

	/*
	*	Liste de tout les utilisateur de l'application qui est connecté 
	*/
	find() : Promise<boolean> {

		return new Promise<boolean>( async (resolve) => { 

			let url = '/user';

			let response = await fetch( url )

			this.users = [] ; 

			if ( response.ok ) {
				let data = await response.json() as user[] ;
				console.log( data ) ; 
				for( let d of data ){
					this.users = [ d , ...this.users ] ;
				} 
			} 

			super.alert() ; 

			return resolve( true ) ;
			
		});

	}

}