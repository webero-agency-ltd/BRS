
import { configSite } from '../interface/configSite';
import { infusionTag } from './tagPageOption';
import { User } from './User';

export interface sdkifst{

	config : configSite , 

	redirect_uri : string , 
	redirect_tkn : string , 
	tokenfile : string , 

	getToken?: ()=> object ,
	setToken?: (token : string , cbl : CallableFunction)=> void  ,
	getUrlAuht?: ()=> string  ,
	initToken?: (code : string)=> Promise <boolean>  ,
	tags?: ()=> Promise <string[]>  ,
	user?: ( data : number )=> Promise <User>  ,
	affilier?: ( data : infusionTag[] ) => Promise <string[]>  ,

}

