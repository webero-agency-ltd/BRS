
import ready from '../libs/ready';
import on from '../libs/event';
import { sel } from '../libs/select';


let submit = function ( data : object , cbl : CallableFunction ) {

	console.log( data ) ;

	/*
		var formData = new FormData();
                
	    formData.append("user", data.user);
	    formData.append("pass", data.pass);

	    fetch('/login',{

	    	method : 'POST',
	    	headers : {

	    	},
	    	body : formData ,

	    })

		setTimeout(()=>{

			cbl() ; 

		} ,3000) 
	*/

}

ready(()=>{

	let btn: HTMLElement  = document.querySelector( '#submit-button' ) ;
	let btn_loader : HTMLElement = document.querySelector( '#submit-button > .ld' ) ;
		
	//les champs formulaire 
	let id : HTMLInputElement = document.querySelector( '#input-id' ) ; 
	let id_error : HTMLElement = document.querySelector( '#input-pass + .form-error' ) ;

	let pass : HTMLInputElement = document.querySelector( '#input-pass' ) ;
	let pass_error : HTMLElement = document.querySelector( '#input-pass + .form-error' ) ;

	let remember : HTMLInputElement = document.querySelector( '#input-remember' ) ;

	//ici on écoute le change de la valeur des input
	on( pass , 'input' ,( e )=>{
		console.log('CHANGE INPUT' , e ) ; 
	})

	on( id , 'input' ,( e )=>{
		console.log('CHANGE INPUT' , e ) ; 
	})

	//écouté l'evenement si on clique sur le boutton d'envoye de formulaire
	on( btn , 'click', ( e )=>{
		e.preventDefault() ; 
		//afficher le loader du bouton
		btn_loader.style.display = 'block';
		btn.setAttribute("disabled", "true");

		let user = id.value ; 
		let password = id.value ; 
		submit( { user , pass } , ()=>{
			btn_loader.style.display = 'none';
			btn.removeAttribute("disabled");
		}) ;

	})

})