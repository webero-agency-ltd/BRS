

import { tag } from '../interface/tag' ;

//declare type ChangeCallback = ( store : tagStore ) => void 

export default class Store{
	
	public tags : tag[] ;

	public callback : CallableFunction[] = [] ; 

	public static i : number  = 0; 

	static increment(){

		if (this.i===null) {
			this.i = 0  ; 
		}
		return this.i++;
	
	}

	constructor() {

	}

	onChange( cbl : CallableFunction ){
		this.callback.push( cbl ) ; 
	}

	/*
	*	Alerté les composante qu'il y a des changements 
	*/

	alert(){
		this.callback.forEach( cbl => cbl( this ) ) ; 
	}

}