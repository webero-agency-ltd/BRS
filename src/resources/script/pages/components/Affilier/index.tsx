
import * as React from 'react'

import { Table , Row , Col , Container } from 'react-bootstrap';

import { contacts } from '../../interface/contacts' ;

import contactsStore from '../../stores/contactsStore' ;

import Loader from '../Loader/'

interface props {

} 

interface state {
	contacts : contacts[]
	Loadershow : boolean
} 

export default class Tableaux extends React.Component<props,state>{

	private store : contactsStore = new contactsStore(1)

	constructor(props){

		super(props) ; 

		this.state = {
			contacts  :  [] ,
			Loadershow  : true , 
		}

		this.store.onChange(( store )=>{
			console.log('..............................') 
			this.setState( {contacts : store.contacts , Loadershow:false}) ; 
			console.log ( store.contacts ) ; 
		})

	}

	shouldComponentUpdate( prop:props , state:state ){

		let ret = false ; 
		(this.state.contacts != state.contacts)
		?ret=true:'';
		return ret ;

	}

	componentDidMount(){

		this.store.find() ;  

	}

	render(){

		let { contacts , Loadershow } = this.state ; 

		return <Container>
			<Row>
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
							      	<td>{e.date}</td>
							      	<td>{e.type}</td>
							      	<td>{e.produit}</td>
							      	<td>{e.last_name}</td>
							      	<td>{e.first_name}</td>
							      	<td>{e.prix} £</td>
							      	<td>{e.payement}</td>
							    </tr>
						  	})}
					  	</tbody>
					</Table>
				</Col>
			</Row>
			<Loader Show={Loadershow} ></Loader>
			
		</Container>
	}



} 