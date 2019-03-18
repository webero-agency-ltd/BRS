import { Moment } from 'moment' ;



export interface contacts{

	first_name? : string
	email? : string
	id? : number
	last_name? : string
	type? : string
	produit? : string
	prix? : string
	date? : Moment
	payement? : string 
}

