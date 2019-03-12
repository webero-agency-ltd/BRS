
import { tag } from '../interface/tag' ;

import Store from './Store' ;

//declare type ChangeCallback = ( store : tagStore ) => void 

export default class configStore extends Store {
	
	public tags : tag[] ;

	constructor() {
		super() ; 
		this.tags = [] ;  
	}

	addTag( name:string,value:string,rull:string ) : Promise<boolean> {

		this.alert() ; 

		return new Promise<boolean>( async (resolve) => { 

			
		});

	}

	removeTag( tag : tag ) :void {

	}

	editTag( tag : tag , text : string ) :void {

	}

	find() : Promise<string> {

		return new Promise<string>( async (resolve) => { 
			
		});

	}

}