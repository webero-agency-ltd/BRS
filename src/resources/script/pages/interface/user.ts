export interface user{

	id?: number;
    contactId?: number;
    family_name?: string;
  	given_name?: string;
  	email: string;
    password: any;
    role?: any;
  	rememberToken?: string;
  	createdAt?: Date;
  	updatedAt?: Date;
	
}