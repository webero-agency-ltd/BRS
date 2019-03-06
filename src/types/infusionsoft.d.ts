
declare type sdkifst = import('../interface/sdkifst').sdkifst;


declare namespace Express {

   	export interface Request {
      	ifstInitToken?: ()=> boolean
      	ifstFindToken?: ( data:string )=> Promise <boolean>
         validator?: ( data:string , code : number )=> void
         infusionsoft?: sdkifst
         //déclaration de fonction si user est connecté ou pas 
      	isUser?: ( data?:object )=> boolean
   	}

   	export interface Response {
      	response?: ( data : object , code : number )=> void
   	}
   	
}