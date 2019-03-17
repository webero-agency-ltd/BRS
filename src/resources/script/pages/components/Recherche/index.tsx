
import * as React from 'react'
import { Table , Row , Col , Button , Container } from 'react-bootstrap';

import { contacts } from '../../interface/contacts' ;

import contactsStore from '../../stores/contactsStore' ;

import lang from '../../../libs/lang' ;

import Loader from '../Loader/'

import Modals from '../Modale/'

interface props {

} 

interface state {
	contacts : contacts[]
	Loadershow : boolean
	
	Modale : boolean 
	modalComps : string 
	modalTitle : string
	modalBtn : object 

} 

export default class Recherche extends React.Component<props,state>{

	private store : contactsStore = new contactsStore(2)

	constructor(props){

		super(props) ; 

		this.state = {

			contacts  :  [] , 
			Loadershow  : true , 

			Modale  : false , 
			modalComps  : '' , 
			modalTitle : '' ,
			modalBtn : {} , 

		}

		this.store.onChange(( store )=>{
			console.log('..............................') 
			this.setState( {contacts : store.contacts , Loadershow : false }) ; 
			console.log ( store.contacts ) ;  
		})

		console.log('-------------mmmmmmmmmmmmmmmmmmmmmmmmmmmm')

	}

	componentDidMount(){

		this.store.find() ; 

	}

	handleShowModal( modalComps : string , modalTitle : string , modalBtn = {} ){
		this.setState( { Modale: true , modalComps , modalTitle , modalBtn } ) ; 
	
	}


	editePageRecherche(){

		this.handleShowModal(
			'EditePageRechercheUser' , 
			lang('tagmanager_page_recherche_user'),
			{ submit: lang('modale_btn_add_tag') , cancel : lang('cancel')})

	}

	/*
	*	Close modale qui serait afficher 
	*/
	handleCloseModal(){

		this.setState( { Modale: false , modalComps : '' , modalTitle : '' } ) ; 

	}


	render(){

		let { contacts , Loadershow , modalTitle , Modale , modalComps , modalBtn } = this.state ;  

		return <Container> <Row>
			<Col xs={12} >
				<Button variant="warning" onClick={ ()=> this.editePageRecherche() } >{lang('r_search_option')}</Button>
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
				</div>	
			</Col>
		</Row>
		<Loader Show={Loadershow} ></Loader>
		<Modals 
			title={ modalTitle }
			show={ Modale } 
			type={ modalComps }
			btn={ modalBtn }
			closeModal={ () => this.handleCloseModal() }
			></Modals>
		</Container>
	}

}