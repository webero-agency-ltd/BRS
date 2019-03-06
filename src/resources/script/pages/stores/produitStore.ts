

import { produit } from '../interface/produit' ;

declare type ChangeCallback = ( store : produitStore ) => void 

export default class produitStore  {
	
	public produits : produit[]

	private callback : ChangeCallback[] = [] ; 

	private static i : number  = 0; 

	static increment(){

		if (this.i===null) {
			this.i = 0  ; 
		}
		return this.i++;
	
	}

	constructor() {
		
		this.produits = [] ; 

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

	addProduit( name:string , prixLv1:string , prixLv2:string , tag:string ) : Promise<any> {

		let obj = { name , prixLv1 , prixLv2 , tag } ;

		let filter =  Object.keys(obj).filter((e) => {
			if( obj[e] !== "" )
				return obj[e] ;
		});

		let finaleObj = {}

		filter.forEach((e) =>{
			finaleObj[e] = obj[e]; 
		})
		
		return new Promise<any>( async (resolve) => { 

			let url = '/admin/produit';

			let response = await fetch( url ,{
				method : 'POST' , 
				headers : {
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify( finaleObj )
			})

			if ( response.ok ) {
				
				let data = await response.json() as produit ;

				if ( data.id  ) {

					this.produits = [{
						id  	: data.id , 
						name	: data.name	,
						prixLv1	: data.prixLv1	,
						prixLv2	: data.prixLv2	,
						tag 	: data.tag	,
					}, ...this.produits ] ;

					this.alert() ; 

				}else{
					return resolve(null) ;
				}

			}else if( response.status == 400 ){
				return resolve( response.json() ) ; 
			}

			return resolve(null) ; 
			
		}); 

	}


	find() : Promise<boolean> {

		return new Promise<boolean>( async (resolve) => { 

			let url = '/admin/produit';

			let response = await fetch( url )

			let data = {} ; 
			let produits : produit[] = [] ; 
			let option : boolean = null ;

			if ( response.ok ) {
				data = await response.json() ; 
				produits = data as produit[] ;
			}

			this.produits = [ ...produits ] ; 

			this.alert() ; 

			return resolve( response.ok ) ;
			
		});

	}


	removeProduit( produit : produit ) : Promise<boolean> {
		
		return new Promise<any>( async (resolve) => { 

			let url = '/admin/produit';

			let response = await fetch( url ,{
				method : 'DELETE' , 
				headers : {
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify( {id:produit.id} )
			})

			return resolve( response.ok ) ; 
			
		}); 

	}

	/*
	editTag( tag : tag , text : string ) :void {

		this.tags = this.tags.map( e => e !== tag ? {...e , text } : e ) ; 
		this.alert() ; 

	}
	*/
}