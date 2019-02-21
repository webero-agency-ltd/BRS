
const request = require('request');
const querystring = require('querystring');

const fs = require('fs');
const path = require('path') ; 

import { configSite } from '../interface/configSite';

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

	//Récupération des contacts qui correspond a un tag particuler 

	tags( $id : number ){

		let url = this.urlAPI + '/tags/' + $id + '/contacts?access_token='+this.token['access_token'] ; 

		return new Promise<any[]>( (resolve) => { 

			request({
			    headers: {
			      'Content-Type': 'application/json'
			    },
			    uri:url,
			    method: 'GET'
			}, function (error, res, body) {

				console.log( body ) ; 
				
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

}

module.exports = infusionsoftSDK