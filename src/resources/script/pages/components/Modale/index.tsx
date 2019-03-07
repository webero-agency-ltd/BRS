import * as React from 'react'

import { Modal , Button } from 'react-bootstrap';
//Importation de tout les composante qui utilise le modale 
import EditePage from '../admin/EditePage/';
import EditeProduit from '../admin/EditeProduit/';
import EditePageRecherche from '../admin/EditePageRecherche/'

let comps = { EditePage , EditeProduit , EditePageRecherche } ; 

interface modaleProps {

	show : boolean 
	closeModal : () => void 
	type : string 
	title : string 

}

interface modaleStade {

	child : any , 

}


export default class Modale extends React.Component <modaleProps , modaleStade>{

	private child : React.RefObject<any>

	constructor( props ){

		super( props )

		this.child = React.createRef(); 

	}

	submit(){

		this.child.current.onSubmite()

	}

	render(){

		let { show , closeModal , type , title } = this.props ; 

		const TagName = comps[type] ;

    	return <Modal onHide={ closeModal } show={ show }>

		  	<Modal.Header closeButton>
		    	<Modal.Title>{ title }</Modal.Title>
		  	</Modal.Header>

		  	<Modal.Body>
		    	{
		    		type && <TagName close={ closeModal } ref={ this.child } />
		    	}
		  	</Modal.Body>

		  	<Modal.Footer>
		    	<Button onClick={ closeModal } variant="secondary">Close</Button>
		    	<Button onClick={ ()=>{ this.submit() } } variant="primary">Save changes</Button>
		  	</Modal.Footer>

		</Modal>

	}

}