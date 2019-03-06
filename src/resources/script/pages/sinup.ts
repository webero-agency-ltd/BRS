
import ready from '../libs/ready';
import on from '../libs/event';
import { sel } from '../libs/select';

interface sinup{
	contactId : string
	password : string
	confpassword : string
	email : string
}

let submit = async function ( data : sinup , cbl : CallableFunction ) {
				
    let response = await fetch('/sinup',{
    	method : 'POST',
    	headers : {'Content-Type' : 'application/json'},
    	body : JSON.stringify( data )
    })

    if ( response.ok ) { 

		let r = await response.json() ; 

		if ( !r.id ) {
			return cbl({contactId:['Une erreur est survenue veiller réessayer svp']}, true) ;
		}
		
		//on s'authentifie a l'application 
		let login = await fetch('/login',{
	    	method : 'POST',
	    	headers : {'Content-Type' : 'application/json'},
	    	body : JSON.stringify( {email:data.email,password:data.password} )
	    })

	    if ( login.ok ) {
	    	window.location.reload() ; 
	    }else{
			window.location.href = '/login' ; 
	    }

	}else{
		let err = await response.json() ; 
		cbl(err, true) ; 
	}

}

ready(()=>{

	let btn: HTMLElement  = document.querySelector( '#submit-button' ) ;
	let btn_loader : HTMLElement = document.querySelector( '#submit-button > .ld' ) ;
		
	//les champs formulaire 
	let contactIdF : HTMLInputElement = document.querySelector( '#input-id' ) ;
	let alert : HTMLInputElement = document.querySelector( '#alert-erreur' ) ; 
	let emailF : HTMLInputElement = document.querySelector( '#input-email' ) ; 

	let pass : HTMLInputElement = document.querySelector( '#input-pass' ) ;
	let pass_error : HTMLElement = document.querySelector( '#input-pass + .form-error' ) ;

	let conf_pass : HTMLInputElement = document.querySelector( '#input-conf-pass' ) ;
	let conf_pass_error : HTMLElement = document.querySelector( '#input-conf-pass + .form-error' ) ;


	//ici on écoute le change de la valeur des input
	on( pass , 'input' ,( e )=>{
		pass.classList.remove("error");
		pass_error.innerHTML = "" ; 
		pass_error.style.display = 'none';
	})

	on( conf_pass , 'input' ,( e )=>{
		conf_pass.classList.remove("error");
		conf_pass_error.innerHTML = "" ; 
		conf_pass_error.style.display = 'none';
	})

	//écouté l'evenement si on clique sur le boutton d'envoye de formulaire
	on( btn , 'click', ( e )=>{
		
		e.preventDefault() ; 
		//afficher le loader du bouton
		btn_loader.style.display = 'block';
		btn.setAttribute("disabled", "true");

		let contactId = contactIdF.value ; 
		let password = pass.value ; 
		let confpassword = conf_pass.value ; 
		let email = emailF.value ; 

		submit( { contactId , password , confpassword , email } as sinup , ( data , err )=>{

			if ( err ) {
				for( let e of Object.keys(data) ){
					if ( e=='password') {
						pass.className += " error";
						pass_error.innerHTML = data[e][0] ; 
						pass_error.style.display = 'block';
					}else if( e=='confpassword'){
						conf_pass.className += " error";
						conf_pass_error.innerHTML = data[e][0] ; 
						conf_pass_error.style.display = 'block';
					}else if (e=='contactId') {
						alert.style.display = 'block';
						alert.innerHTML = data[e][0] ; 
						
					}
				}
			}

			btn_loader.style.display = 'none';
			btn.removeAttribute("disabled");
		
		});

	})

})