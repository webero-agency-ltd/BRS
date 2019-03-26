//@documentation = OK 

import * as React from 'react'
import { Badge , Button , FormControl , ListGroup , Form } from 'react-bootstrap';

import lang from '../../../libs/lang' ;
import { tag } from '../../interface/tag' ;
import produitStore from '../../stores/produitStore' ;

//interface de l'erreur 
//ce varriable est utiliser dans le composante ReactJS 
//pour Afficher les erreur de l'édition de formulaire sur le serveur 
interface erreur{
	name : string , 
	prixLv1 : string , 
	prixLv2 : string , 
	tag : string , 
}

//l'interface de la composante reactJS ( éxigence typescript )
interface props {
	close : ()=> void ,
} 

//l'interface de la state reactJS ( éxigence typescript )
interface state {
	
	name : string , 
	prixLv1 : string , 
	prixLv2 : string , 
	tag : string , 

	//erreur formulaire 
	errors? : erreur , 

} 

export default class EditePage extends React.Component<props,state>{

	private store : produitStore = new produitStore()

	constructor(props){

		super(props) ; 

		//initialisation des varriable de stat 
		this.state = {

			//information sur le produit 
			name : '' , 
			prixLv1 : '' , 
			prixLv2 : '' , 
			tag : '' , 

			//initialisation des stat erreur 
			errors : {
				name : '' , 
				prixLv1 : '' , 
				prixLv2 : '' , 
				tag : '' 
			}

		}

		//ici on bind les fonctions utiles 
		this.updateName = this.updateName.bind(this);
		this.updatePrixLv1 = this.updatePrixLv1.bind(this);
		this.updatePrixLv2 = this.updatePrixLv2.bind(this);
		this.updateTag = this.updateTag.bind(this);

	}

	/*
	*	On a cliquer sur le button principale de submit  
	*	du modale, on execute cette fonction 
	*/
	async onSubmite() {

		//récupération des varriables utiles dans le state 
		let { name , prixLv1 , prixLv2 , tag } = this.state ; 

		//on Call la fonction du store qui se charge de l'enregistrement des donners dans le serveur 
		let setStore = await this.store.addProduit( name , prixLv1 , prixLv2 , tag ) ; 

		//apre que la request du serveur est OK, on vérifie s'il ny a pas d'erreur  
		//si la réponse est un Object, il y a donc une erreur 
		if ( setStore && typeof setStore == 'object' && Object.keys(setStore).length > 0 ) {
			//on récupére l'erreur dans l'object et on l'assigne au stat error
			let keys = Object.keys(setStore) ;
			for(let index of keys ){
				if ( Object.keys( this.state.errors ).includes( index ) ) 
					this.state.errors[index] = setStore[index][0]
			}
			this.setState( {errors : this.state.errors} ) ; 
			//apres ca, les erreurs seront afficher automatiquement dans le modale
		}else{
			//s'il ny a pas d'erreur, verme le modale et on réactualise la page admin 
	    	this.props.close() ; 
	    	//@todo : enlever cette reload et le changer en alert information  
	    	window.location.reload() ; 
	    }

	}

	/*
	*	A chaque changement dans le forumulaire, 
	*	ces fonction update le stats de reactjs des information du produit 
	*/
	updateName( e ){
		this.setState({ name : (e.target as HTMLInputElement ).value }) ; 
	}

	updatePrixLv1( e ){
		this.setState({ prixLv1 : (e.target as HTMLInputElement ).value }) ; 
	}

	updatePrixLv2( e ){
		this.setState({ prixLv2 : (e.target as HTMLInputElement ).value }) ; 
	}

	updateTag( e ){
		this.setState({ tag : (e.target as HTMLInputElement ).value }) ; 
	}

	/********************************************************/

	render(){
		
		let { name , prixLv1 , prixLv2 , tag } = this.state ; 

		let errors = this.state.errors ; 

		return <div>
			<Form>
				<Form.Group>
				    <Form.Control 
				    	isInvalid={ errors.name !== "" }
				    	onChange={ this.updateName } value={ name } type="text" placeholder={ lang('modalProduitName') } />
				    <Form.Control.Feedback type="invalid" >{ errors.name }</Form.Control.Feedback>
				</Form.Group>
				<Form.Group>
				    <Form.Control 
				    	isInvalid={ errors.prixLv1 !== "" }
				    	onChange={ this.updatePrixLv1 } value={ prixLv1 } type="text" placeholder={ lang('modalProduitPrixLv1') } />
					<Form.Control.Feedback type="invalid" >{ errors.prixLv1 }</Form.Control.Feedback>
				</Form.Group>
				<Form.Group>
				    <Form.Control 
				    	isInvalid={ errors.prixLv2 !== "" }
				    	onChange={ this.updatePrixLv2 } value={ prixLv2 } type="text" placeholder={ lang('modalProduitPrixLv2') } />
					<Form.Control.Feedback type="invalid" >{ errors.prixLv2 }</Form.Control.Feedback>
				</Form.Group>
				<Form.Group>
				    <Form.Control 
				    	isInvalid={ errors.tag !== "" }
				    	onChange={ this.updateTag } value={ tag } type="text" placeholder={ lang('modalProduitTag') } />
					<Form.Control.Feedback type="invalid" >{ errors.tag }</Form.Control.Feedback>
				</Form.Group>
			</Form>
		</div>;

	}
	

}