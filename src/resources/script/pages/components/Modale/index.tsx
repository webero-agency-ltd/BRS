import * as React from 'react'

import { Modal , Button } from 'react-bootstrap';
//Importation de tout les composante qui utilise le modale 
import EditePageAffiliet from '../EditePageAffiliet/';
import EditeProduit from '../EditeProduit/';
import EditePageRecherche from '../EditePageRecherche/'
import EditePageRechercheUser from '../EditePageRechercheUser/'
import EditePrice from '../EditePrice/'

let comps = { EditePageAffiliet , EditeProduit , EditePageRecherche , EditePageRechercheUser , EditePrice } ; 

interface modaleProps {

	show : boolean 
	closeModal : () => void 
	type : string 
	title : string 
	btn : object 

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

		let { show , closeModal , type , title , btn } = this.props ;  

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
		    	<Button onClick={ closeModal } variant="secondary">{ btn['cancel'] ? btn['cancel'] : 'Close' }</Button>
		    	<Button onClick={ ()=>{ this.submit() } } variant="primary">{ btn['submit'] ? btn['submit'] : 'Save' }</Button>
		  	</Modal.Footer>

		</Modal>

	}

}