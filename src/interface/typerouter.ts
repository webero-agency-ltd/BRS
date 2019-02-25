export interface typeRouter{

	url: string , 

	ctrl: string , 

	verb: string , 

	validator?: string , 

}


export interface responseRoute{

	validate( data : string ) : void , 

}