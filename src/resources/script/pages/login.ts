
import ready from '../libs/ready';
import on from '../libs/event';
import rememberAction from '../libs/remember';
import { sel } from '../libs/select';


let submit = async function ( data : object , cbl : CallableFunction ) {

	let response = await fetch('/login',{
    	method : 'POST',
    	headers : {'Content-Type' : 'application/json'},
    	body : JSON.stringify( {email:data['user'],password:data['password'],remember:true})
    })

    if ( response.ok ) { 
    	let data = await response.json() ; 
    	window.location.reload() ; 
    }else{
    	cbl( false )
    }

}

function getCookie(name) {
  	var value = "; " + document.cookie;
  	var parts = value.split("; " + name + "=");
  	if (parts.length == 2) return parts.pop().split(";").shift();
}

ready(()=>{

	let btn: HTMLElement  = document.querySelector( '#submit-button' ) ;
	let btn_loader : HTMLElement = document.querySelector( '#submit-button > .ld' ) ;
	
	let alert : HTMLInputElement = document.querySelector( '#alert-erreur' ) ; 

	//les champs formulaire 
	let id : HTMLInputElement = document.querySelector( '#input-id' ) ; 
	let id_error : HTMLElement = document.querySelector( '#input-pass + .form-error' ) ;

	let pass : HTMLInputElement = document.querySelector( '#input-pass' ) ;
	let pass_error : HTMLElement = document.querySelector( '#input-pass + .form-error' ) ;

	let remember : HTMLInputElement = document.querySelector( '#input-remember' ) ;
	
	let rememberToken : HTMLInputElement = document.querySelector( '#input-remember-value' ) ;

	
	//ici on écoute le change de la valeur des input
	on( pass , 'input' ,( e )=>{
		//console.log('CHANGE INPUT' , e ) ; 
	}) 

	on( id , 'input' ,( e )=>{
		//console.log('CHANGE INPUT' , e ) ; 
	})

	//écouté l'evenement si on clique sur le boutton d'envoye de formulaire
	on( btn , 'click', ( e )=>{
		e.preventDefault() ; 
		//afficher le loader du bouton
		btn_loader.style.display = 'block';
		btn.setAttribute("disabled", "true");

		let user = id.value ; 
		let password = pass.value ; 

		submit( { user , password , remember } , ( success )=>{

			btn_loader.style.display = 'none';
			btn.removeAttribute("disabled");
			if (!success) {
				alert.style.display = 'block';
				alert.innerHTML = 'l\'identifiant Ou le mot de passe incorrecte' ; 
			}

		});

	})

	if ( rememberToken ) {
		//connecion automatique 
		rememberAction( rememberToken.value , ()=>{
			//Erreur sur le remeber token rememberToken 
		}); 
	}

})