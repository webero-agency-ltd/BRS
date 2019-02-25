import * as React from 'react'
import { Badge , Button , FormControl , ListGroup , Form } from 'react-bootstrap';

import lang from '../../../../libs/lang' ;
import { tag } from '../../../interface/tag' ;
import produitStore from '../../../stores/produitStore' ;

interface erreur{
	name : string , 
	prixLv1 : string , 
	prixLv2 : string , 
	tag : string , 
}

interface searchTagProps {
	close : ()=> void ,
} 

interface searchTagState {
	
	name : string , 
	prixLv1 : string , 
	prixLv2 : string , 
	tag : string , 

	//erreur formulaire 
	errors? : erreur , 

} 

export default class EditePage extends React.Component<searchTagProps,searchTagState>{

	private store : produitStore = new produitStore()

	constructor(props){

		super(props) ; 

		this.state = {

			name : '' , 
			prixLv1 : '' , 
			prixLv2 : '' , 
			tag : '' , 

			errors : {
				name : '' , 
				prixLv1 : '' , 
				prixLv2 : '' , 
				tag : '' 
			}

		}

		this.updateName = this.updateName.bind(this);
		this.updatePrixLv1 = this.updatePrixLv1.bind(this);
		this.updatePrixLv2 = this.updatePrixLv2.bind(this);
		this.updateTag = this.updateTag.bind(this);

	}

	async onSubmite() {


		let { name , prixLv1 , prixLv2 , tag } = this.state ; 

		let setStore = await this.store.addProduit( name , prixLv1 , prixLv2 , tag ) ; 

		if ( setStore && typeof setStore == 'object' && Object.keys(setStore).length > 0 ) {
			let keys = Object.keys(setStore) ;
			for(let index of keys ){
				if ( Object.keys( this.state.errors ).includes( index ) ) 
					this.state.errors[index] = setStore[index][0]
			}
			this.setState( {errors : this.state.errors} ) ; 
		}else{
	    	this.props.close() ; 
	    	window.location.reload() ; 
	    }

	}

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