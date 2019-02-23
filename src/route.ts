import { typeRouter } from './interface/typerouter';


class route {

	private _verbe : typeRouter[] 
	
	constructor() {
		this._verbe = [] ; 
	} 

	add( obj : typeRouter ){
		this._verbe.push(obj)
		return this._verbe ; 
	}

	get( url : string , ctrl : string ) : typeRouter[] {
		return this.add({url,ctrl,'verb':'get'}) ; 
	}

	post( url : string , ctrl : string ) : typeRouter[] {
		return this.add({url,ctrl,'verb':'post'}) ;  
	}

	put( url : string , ctrl : string ) : typeRouter[] {
		return this.add({url,ctrl,'verb':'put'}) ;  
	}

	delete( url : string , ctrl : string ) : typeRouter[] {
		return this.add({url,ctrl,'verb':'delete'}) ;  
	}

	get verbe() : typeRouter[] {
		return  this._verbe;
	}

}

export default new route() ; 