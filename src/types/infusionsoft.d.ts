
declare type sdkifst = import('../interface/sdkifst').sdkifst;


declare namespace Express {

   	export interface Request {
      	ifstInitToken?: ()=> boolean
      	ifstFindToken?: ( data:string )=> Promise <boolean>
      	infusionsoft?: sdkifst
   	}

   	export interface Response {
      	response?: ( data : object , code : number )=> void
   	}
   	
}