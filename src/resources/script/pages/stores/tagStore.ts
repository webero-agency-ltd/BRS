
import Store from './Store' ;

import { tag } from '../interface/tag' ;

declare type ChangeCallback = ( store : tagStore ) => void 

export default class tagStore extends Store {
	
	public tags : tag[] ; 

	private page_id : number;

	constructor( page_id ) {
		
		super() ; 
		this.tags = [] ; 
		this.page_id = page_id ; 

	}

	addTag( name:string,value:string,rull:string ) : Promise<boolean> {

		return new Promise<boolean>( async (resolve) => { 

			let url = '/tags';

			let page_id = this.page_id ; 
			let response = await fetch( url ,{

				method : 'POST' , 
				headers : {
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify({ name , value , page_id , rull })

			})

			if ( response.ok ) {

				let data = await response.json() ;

				this.tags = [{
					id  		: data.id , 
					name 		: data.name , 
					value 		: data.value , 
					page_id 	: data.page_id , 
				}, ...this.tags ] ; 

				super.alert() ; 
				
				return resolve( true ) ; 
			
			}

			return resolve( false ) ; 
			
		});


	}

	removeTag( tag : tag ) : Promise<boolean>  {

		return new Promise<boolean>( async (resolve) => { 

			let url = '/tags';

			let page_id = this.page_id ; 
			let response = await fetch( url ,{

				method : 'DELETE' , 
				headers : {
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify( tag )

			})

			if ( response.ok ) {

				let data = await response.json() ;

				this.tags = this.tags.filter( e => e !== tag ) ;

				super.alert() ; 
				
				return resolve( true ) ; 
			
			}

			return resolve( false ) ; 
			
		});

	}

	editTag( tag : tag , text : string ) :void {

		this.tags = this.tags.map( e => e !== tag ? {...e , text } : e ) ; 
		super.alert() ; 

	}

	find() : Promise<string> {

		return new Promise<string>( async (resolve) => { 

			let url = '/tags?page_id='+this.page_id;

			let response = await fetch( url )

			let tags : tag[] = [] ; 
			let option : string = '1' ;

			if ( response.ok ) {
				let data = await response.json() as tag[] ;
				for( let d of data ){
					this.tags = [ d , ...this.tags ] ;
				} 
			} 

			super.alert() ; 

			return resolve( option ) ;
			
		});

	}

}