
import { typeRouter , responseRoute } from './interface/typerouter';

class route {

	private _verbe : typeRouter[] 
	
	constructor() {
		this._verbe = [] ; 
	} 

	add( obj : typeRouter ){
		return this._verbe.push(obj) ; 
	}

	get( url : string , ctrl : string ) {
		let i = this.add({url,ctrl,'verb':'get'}) ; 
		return this.response( i ) ;   
	}

	post( url : string , ctrl : string ) {
		let i = this.add({url,ctrl,'verb':'post'}) ; 
		return this.response( i ) ;  
	}

	put( url : string , ctrl : string ) {
		let i = this.add({url,ctrl,'verb':'put'}) ; 
		return this.response( i ) ;  
	}

	delete( url : string , ctrl : string ) {
		let i = this.add({url,ctrl,'verb':'delete'}) ; 
		return this.response( i ) ;    
	}

	/*
	*	Donner de response 
	*/
	response( item : number ) : responseRoute {

		return  { 
			validate : ( data : string )=>{
				this._verbe[item-1]['validator'] = data ; 
			}
			//autre fonction a ajouter dans le future et que l'on peut utilisé pour le traitemment 
			//ex : utilise ce middewaire en particulier 
		} as responseRoute ;

	}

	get verbe() : typeRouter[] {
		return  this._verbe;
	}

}

export default new route() ; 