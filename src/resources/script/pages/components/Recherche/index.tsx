
import * as React from 'react'
import { Table , Row , Col , Button } from 'react-bootstrap';

import { contacts } from '../../interface/contacts' ;

import contactsStore from '../../stores/contactsStore' ;

import lang from '../../../libs/lang' ;


interface props {
	editePageRecherche : ( ) => void
	closeLoader : ( ) => void

} 

interface state {
	contacts : contacts[]
} 

export default class Recherche extends React.Component<props,state>{

	private store : contactsStore = new contactsStore(2)

	constructor(props){

		super(props) ; 

		this.state = {
			contacts  :  [] , 
		}

		this.store.onChange(( store )=>{
			console.log('..............................')
			this.props.closeLoader() ; 
			this.setState( {contacts : store.contacts }) ; 
		})

	}

	componentDidMount(){

		this.store.find() ; 

	}


	render(){

		let { contacts } = this.state ; 

		let { editePageRecherche } = this.props ; 

		return <Row>
			<Col xs={12} >
				<Button variant="warning" onClick={ ()=> editePageRecherche() } >{lang('r_search_option')}</Button>
			</Col>
			<Col xs={12} >
				<div className="tspace-1" >
					<Table striped bordered hover>
					  	<thead>
					    	<tr>
						      	<th>Date</th>
						      	<th>Type</th>
						      	<th>Produit</th>
						      	<th>Prénom</th>
						      	<th>Nom</th>
						      	<th>Montant</th>
						      	<th>Facture</th>
					    	</tr>
					  	</thead>
					  	<tbody>
						  	{contacts.map((e)=>{
							    return <tr key={e.id} >
							      	<td>...</td>
							      	<td>{e.type}</td>
							      	<td>{e.produit}</td>
							      	<td>{e.last_name}</td>
							      	<td>{e.first_name}</td>
							      	<td>{e.prix} £</td>
							      	<td>...</td>
							    </tr>
						  	})}
					  	</tbody>
					</Table>
				</div>	
			</Col>
		</Row>
	}

}