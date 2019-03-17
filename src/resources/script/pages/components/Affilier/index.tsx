
import * as React from 'react'
import { Table , Row , Col } from 'react-bootstrap';

import { contacts } from '../../interface/contacts' ;

import contactsStore from '../../stores/contactsStore' ;

interface searchTagProps {
	closeLoader : ( ) => void
} 

interface searchTagState {
	contacts : contacts[]
} 

export default class Tableaux extends React.Component<searchTagProps,searchTagState>{

	private store : contactsStore = new contactsStore(1)

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

		return <Row>
			<Col>
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
			</Col>
		</Row>
	}



}