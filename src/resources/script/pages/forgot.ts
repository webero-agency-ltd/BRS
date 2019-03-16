
import ready from '../libs/ready';
import on from '../libs/event';
import rememberAction from '../libs/remember';
import { sel } from '../libs/select';


let submit = async function ( data : object , cbl : CallableFunction ) {

	let response = await fetch('/forgot',{
    	method : 'POST',
    	headers : {'Content-Type' : 'application/json'},
    	body : JSON.stringify( {email:data['email']})
    })

    if ( response.ok ) { 
    	let data = await response.json() ; 
    	if (data.success) {
    		return cbl( true )
    	}
    }

    return cbl( false )

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
	let mainSuccess : HTMLInputElement = document.querySelector( '#main-success' ) ; 
	let main : HTMLInputElement = document.querySelector( '#main' ) ; 

	//les champs formulaire  
	let email : HTMLInputElement = document.querySelector( '#input-email' ) ; 
	let id_error : HTMLElement = document.querySelector( '#input-pass + .form-error' ) ; 
	
	//écouté l'evenement si on clique sur le boutton d'envoye de formulaire
	on( btn , 'click', ( e )=>{
		e.preventDefault() ; 
		//afficher le loader du bouton
		btn_loader.style.display = 'block';
		btn.setAttribute("disabled", "true");

		let user = email.value ; 
		
		submit( { email : user } , ( success )=>{

			btn_loader.style.display = 'none';
			btn.removeAttribute("disabled");
			if (!success) {
				alert.style.display = 'block';
				alert.innerHTML = 'l\'identifiant Ou le mot de passe incorrecte' ; 
				main.style.display = 'block';
			}else{
				main.style.display = 'none';
				mainSuccess.style.display = 'block';
			}

		});

	})

})