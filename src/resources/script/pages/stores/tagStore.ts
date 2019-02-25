

import { tag } from '../interface/tag' ;

declare type ChangeCallback = ( store : tagStore ) => void 

export default class tagStore  {
	
	public tags : tag[]

	private callback : ChangeCallback[] = [] ; 

	private static i : number  = 0; 

	static increment(){

		if (this.i===null) {
			this.i = 0  ; 
		}
		return this.i++;
	
	}

	constructor() {
		
		this.tags = [] ; 

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

	addTag( text : string ) :void {

		this.tags = [{
			id  	: tagStore.increment() , 
			text , 
		}, ...this.tags ] ; 

		this.alert() ; 

	}

	removeTag( tag : tag ) :void {
		
		this.tags = this.tags.filter( e => e !== tag ) ;
		this.alert() ; 

	}

	editTag( tag : tag , text : string ) :void {

		this.tags = this.tags.map( e => e !== tag ? {...e , text } : e ) ; 
		this.alert() ; 

	}

	find() : Promise<string> {

		return new Promise<string>( async (resolve) => { 

			let url = '/admin/tags';

			let response = await fetch( url )

			let data = {} ; 
			let tags : tag[] = [] ; 
			let option : string = '1' ;

			if ( response.ok ) {
				data = await response.json() ; 
				tags = ( data['tags'] ) as tag[] ;
				option = ( data['option'] ) as string  ; 
			}

			this.tags = [ ...tags ] ; 

			tagStore.i = this.tags.length ; 

			this.alert() ; 

			return resolve( option ) ;
			
		});

	}

	/*
	*	Envoyer tout les tags au serveur 
	*/
	storeTags( data :string ) : Promise<boolean>{

		return new Promise<boolean>( async (resolve) => { 

			let url = '/admin/tags';

			let response = await fetch( url ,{

				method : 'POST' , 
				headers : {
					'Content-Type' : 'application/json'
				},

				body : JSON.stringify({ tags : this.tags , option : data })

			})

			if ( response.ok ) {
				return resolve( true ) ; 
			}

			return resolve( false ) ; 
			
		}); 
		
	}

}