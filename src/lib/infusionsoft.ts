
const request = require('request');
const querystring = require('querystring');

const fs = require('fs');
const path = require('path') ; 

import { configSite } from '../interface/configSite';
import { User } from '../interface/User';
import { tagPageOption , infusionTag } from '../interface/tagPageOption';

class infusionsoftSDK {

	private config : configSite ;

	private redirect_uri : string ;

	private token : object ;

	private urlAPI : string ;

	private redirect_tkn : string ;

	private tokenfile : string = path.join(__dirname,'../config/token.json') ; 

	constructor( config : configSite ) {

	    this.config = config;
	    this.redirect_uri = this.config.urlapp +'/token' ; 
	    this.redirect_tkn = this.config.urlapp + '/token' ; 

	    this.urlAPI = 'https://api.infusionsoft.com/crm/rest/v1' ; 

	    this.getToken() ; 

	}

	//Récupération des token d'access 
	getToken() : object { 

		if (fs.existsSync(this.tokenfile)) {
			let token = fs.readFileSync(this.tokenfile).toString() ;
			if ( Object.keys( token ).length>0 ) {
				return this.token = JSON.parse( token ) ;
			}
		}
		return {}

	}

	//ajout du token dans le fichier token.json
	setToken( token : string , cbl : CallableFunction ) : void {

		fs.writeFile(this.tokenfile, token, 'utf8', (err)=>{
			if (err)
				cbl( false ) ; 
			cbl( true ) ; 
		});

	}

	//formatage de l'URL d'authentification d'infusionsoft
	 getUrlAuht() : string {
		
		let url = 'https://signin.infusionsoft.com/app/oauth/authorize' ; 
		url+= '?client_id='+this.config.clientId+'&redirect_uri='+encodeURIComponent(this.redirect_uri)+'&response_type=code&scope=full'
		return url; 

	}

	//Initialisation du token apre la redirection et la récuperation des paramètre utile 
	initToken( code : string ) : Promise <boolean> {
		
		let url = 'https://api.infusionsoft.com/token' ; 

		var form = {
			client_id: this.config.clientId , 
	    	client_secret: this.config.clientSecret, 
	    	code : code , 
	    	grant_type: 'authorization_code', 
	    	redirect_uri: this.redirect_tkn 
		};

		var formData = querystring.stringify(form);
		var contentLength = formData.length;

		let that = this ; 

		return new Promise<boolean>( (resolve) => { 

			request({
			    headers: {
			      'Content-Length': contentLength,
			      'Content-Type': 'application/x-www-form-urlencoded'
			    },
			    uri: url ,
			    body: formData,
			    method: 'POST'
			}, function (error, res, body) {
				if (!error && res.statusCode == 200) {
		            that.setToken(body,(res)=>{
		            	resolve(res) ; 
		            })
		        }else{
		        	resolve(false) ; 
		        }
			});

		});

	}

	//Récupération des tags et des ID des tags

	tags(){

		let url = this.urlAPI + '/tags/?access_token='+this.token['access_token'] ; 

		return new Promise<any[]>( (resolve) => { 

			request({
			    headers: {
			      'Content-Type': 'application/json'
			    },
			    uri:url,
			    method: 'GET'
			}, function (error, res, body) {
				
				if (!error && res.statusCode == 200) {
					let jsondata : any[]; 
					try{
						jsondata = JSON.parse( body ) ; 
					}catch( e ){
						jsondata = [] ; 
					}
					return resolve( jsondata ) ; 
		        }
				return resolve( [] ) ; 

			});

		});

	}

	doRequest(  data : infusionTag ) {

		let url = this.urlAPI + '/tags/' + data.id + '/contacts?access_token='+this.token['access_token'] ; 

		return new Promise<any[]>( (resolve) => { 

			request({
			    headers: {
			      'Content-Type': 'application/json'
			    },
			    uri:url,
			    method: 'GET'
			}, function (error, res, body) {
				
				if (!error && res.statusCode == 200) {
					let jsondata : any[]; 
					try{
						jsondata = JSON.parse( body ).contacts ; 
					}catch( e ){
						jsondata = [] ; 
					}
					return resolve( jsondata ) ; 
		        }
				return resolve( [] ) ; 

			});

		});
	
	}

	//Récupération des contacts qui correspond a un tag particuler 

	async affilier( data : infusionTag[] ) : Promise <any> {

		return new Promise<any>( async (resolve) => { 

			let liste = [] ; 
			let users = {} ; 
			let tags = {} ; 

			let incre = 0 ; 
			for( let d of data ){

				console.log('-REQUEST :' + incre  + ' SUR :'+ data.length)
				let cts = await this.doRequest( d ) ; 
				cts.forEach((e)=>{
					if ( users['user_'+e.contact.id] ) {
					 	users['user_'+e.contact.id].tags.push( { id : d.id , date : e.date_applied }  )
					}else{
						users['user_'+e.contact.id] = { user : e.contact , tags : [ { id : d.id , date : e.date_applied } ] } ; 
					}
					if ( tags[ 'tags_'+d.id ] ) {
						tags[ 'tags_'+d.id ].push( { user : e.contact.id , date : e.date_applied} )
					}else{
						tags[ 'tags_'+d.id ] = [{ user : e.contact.id , date : e.date_applied}]; 
					}
				})

				incre++
			}

			resolve( {users:{...users},tags:{...tags}} ) ; 

		});

	}

	async user( data : number ) : Promise <User> {

		return new Promise<User>( async (resolve) => { 

			let url = this.urlAPI + '/contacts/'+data+'?access_token='+this.token['access_token'] ; 

			request({
			    headers: {
			      'Content-Type': 'application/json'
			    },
			    uri:url,
			    method: 'GET'
			}, function (error, res, body) {
				
				if (!error && res.statusCode == 200) {
					let jsondata : {}; 
					try{
						jsondata = JSON.parse( body ) ; 
					}catch( e ){
						jsondata = [] ; 
					}
					return resolve( jsondata ) ; 
		        }
				return resolve( {} ) ; 

			});

		});

	}

}

module.exports = infusionsoftSDK