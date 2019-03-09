

import { tagSearch } from '../interface/tagSearch' ;

declare type ChangeCallback = ( store : tagSearchStore ) => void 

export default class tagSearchStore  {
	
	public tags : tagSearch[]

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

	addTag( textTag : string, valueTag : string ): Promise<boolean> {

		return new Promise<boolean>( async (resolve) => { 

			let url = '/tagSearch';

			let response = await fetch( url ,{

				method : 'POST' , 
				headers : {
					'Content-Type' : 'application/json'
				},

				body : JSON.stringify({ textTag , valueTag })

			})


			if ( response.ok ) {

				let data = await response.json() as tagSearch ;
				
				//option = ( data['option'] ) as string  ;

				this.tags = [data, ...this.tags ] ; 

				this.alert() ; 

				return resolve( true ) ; 

			}

			return resolve( false ) ; 
			
		}); 

	}

	removeTag( tag : tagSearch ) :void {
		
		this.tags = this.tags.filter( e => e !== tag ) ;
		this.alert() ; 

	}

	editTag( tag : tagSearch , text : string ) :void {

		this.tags = this.tags.map( e => e !== tag ? {...e , text } : e ) ; 
		this.alert() ; 

	}

	find() : Promise<string> {

		return new Promise<string>( async (resolve) => { 

			let url = '/admin/tags';

			let response = await fetch( url )

			let data = {} ; 
			let tags : tagSearch[] = [] ; 
			let option : string = '1' ;

			if ( response.ok ) {
				data = await response.json() ; 
				tags = ( data['tags'] ) as tagSearch[] ;
				option = ( data['option'] ) as string  ; 
			}

			this.tags = [ ...tags ] ; 

			tagSearchStore.i = this.tags.length ; 

			this.alert() ; 

			return resolve( option ) ;
			
		});

	}

}