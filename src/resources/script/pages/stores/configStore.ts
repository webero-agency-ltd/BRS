 
import Store from './Store' ;

import { config } from '../interface/config' ;

declare type ChangeCallback = ( store : tagStore ) => void 

export default class tagStore extends Store {
	
	constructor() {
		
		super() ; 

	}

	/*
	*	Edition du config s'il existe et supression s'il n'existe pas 
	*/
	editConfig( name:string , value:string ) : Promise<boolean> {

		return new Promise<boolean>( async (resolve) => { 

			let url = '/config';
			let response = await fetch( url ,{

				method : 'POST' , 
				headers : {
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify({ name , value })

			})

			if ( response.ok ) {

				let data = await response.json() ;
				
				return resolve( true ) ; 
			
			}

			return resolve( false ) ; 
			
		});

	}

	/*
	*	Récupération de la valuer d'un config donner en paramètre
	*/
	find( name : string ) : Promise<string> {

		return new Promise<string>( async (resolve) => { 

			let url = '/config?name='+name ;

			let response = await fetch( url )

			if ( response.ok ) {
		
				let data = await response.json() as config ;

				console.log('ssssssss' , data ,data.value ) ; 

				return resolve( data.value ) ;
		
			} 

			super.alert() ;  

			return resolve( '' ) ;
			
		});

	}

}