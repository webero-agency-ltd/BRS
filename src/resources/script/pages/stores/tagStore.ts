
import Store from './Store' ;

import { tag } from '../interface/tag' ;

declare type ChangeCallback = ( store : tagStore ) => void 

export default class tagStore extends Store {
	
	public tags : tag[] ; 

	private page_id : number;

	private user : boolean;

	constructor( page_id , user?:boolean ) {
		
		super() ; 
		this.tags = [] ; 
		this.page_id = page_id ;

		if ( user )
			this.user = user ; 
		else
			this.user = false ; 

	}

	addTag( name:string,value:string ) : Promise<boolean> {

		return new Promise<boolean>( async (resolve) => { 

			let url = '/tags';

			let page_id = this.page_id ; 
			let response = await fetch( url ,{

				method : 'POST' , 
				headers : {
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify({ name , value , page_id })

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

	/*
	*	Détachement d'un tag a un utilisateur 
	*/
	dettacheTag( id:string ){

		return new Promise<boolean>( async (resolve) => { 

			let url = '/tags/attache';

			let page_id = this.page_id ; 
			let response = await fetch( url ,{

				method : 'DELETE' , 
				headers : {
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify({ id })

			})

			if ( response.ok ) {

				let data = await response.json() ;
				if ( data.id ) {
					return resolve( true ) ; 
				}
			
			}

			return resolve( false ) ; 
			
		});

	}

	/*
	*	Attacher une tag a un utilisateur 
	*/

	attacheTag( id:string ) : Promise<boolean> {

		return new Promise<boolean>( async (resolve) => { 

			let url = '/tags/attache';

			let page_id = this.page_id ; 
			let response = await fetch( url ,{

				method : 'POST' , 
				headers : {
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify({ id })

			})

			if ( response.ok ) {

				let data = await response.json() ;
				if ( data.id ) {
					return resolve( true ) ; 
				}
			
			}

			return resolve( false ) ; 
			
		});
		
	}

	/*
	*	Récuparation des tags qui est attacher a l'utilisateur qui est connecté 
	*/
	findAttacheTag() : Promise<tag[]> {

		return new Promise<tag[]>( async (resolve) => { 

			let url = '/tags/attache' ;

			let response = await fetch( url )

			let tags : tag[] = [] ;

			if ( response.ok ) {
				let data = await response.json() as tag[] ;
				super.alert() ; 
				return resolve( data ) ;
			} 
			super.alert() ; 
			return resolve( [] ) ;
			
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
				body : JSON.stringify( { ...tag , user : this.user } )

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

			this.tags = [] ; 

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