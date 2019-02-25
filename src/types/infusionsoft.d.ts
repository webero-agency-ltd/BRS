
declare type sdkifst = import('../interface/sdkifst').sdkifst;


declare namespace Express {

   	export interface Request {
      	ifstInitToken?: ()=> boolean
      	ifstFindToken?: ( data:string )=> Promise <boolean>
      	validator?: ( data:string , code : number )=> void
      	infusionsoft?: sdkifst
   	}

   	export interface Response {
      	response?: ( data : object , code : number )=> void
   	}
   	
}