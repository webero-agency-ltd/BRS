
import * as React from 'react'
import { Table , Row , Col , Button , Container , Pagination } from 'react-bootstrap';

import { contacts } from '../../interface/contacts' ;

import contactsStore from '../../stores/contactsStore' ;

import lang from '../../../libs/lang' ;

import Loader from '../Loader/'

import Modals from '../Modale/'

interface props {

} 

interface state {
	contacts : contacts[]
	contactsShow : contacts[]
	Loadershow : boolean
	
	Modale : boolean 
	modalComps : string 
	modalTitle : string
	modalBtn : object 

	//pagination information
	perPage : number , 
	pageShow : number , 

} 

export default class Recherche extends React.Component<props,state>{

	private store : contactsStore = new contactsStore(2)

	constructor(props){

		super(props) ; 

		this.state = {
			contactsShow : [] , 
			contacts  :  [] , 
			Loadershow  : true , 

			Modale  : false , 
			modalComps  : '' , 
			modalTitle : '' ,
			modalBtn : {} , 

			perPage : 4 , 
			pageShow : 1 , 

		}

		this.store.onChange(( store )=>{
			console.log('..............................') 
			this.setState( {contactsShow : this.paginateListe( store.contacts ) ,contacts : store.contacts , Loadershow : false }) ; 
			console.log ( store.contacts ) ;  
		})

		console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmm')

	}

	paginateListe( contacts : contacts[]){

		let liste = [...contacts].slice((this.state.pageShow-1) * this.state.perPage, (this.state.pageShow) * this.state.perPage) ; 
		console.log( 'paginateListe' , liste ) ; 
		return  liste ;

	}

	componentDidMount(){

		this.store.find() ; 

		console.log( '-------componentDidMount' ) ; 

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

	changePage( page : number ){

		console.log('--- Chage to The page',page) ;
		this.setState( { pageShow: page } ) ; 
		this.setState( { contactsShow : this.paginateListe( this.state.contacts ) } ) ;  

 	}

	/*
	*	Close modale qui serait afficher 
	*/
	handleCloseModal(){

		this.setState( { Modale: false , modalComps : '' , modalTitle : '' } ) ; 

	}


	render(){

		let { contactsShow , contacts , Loadershow , modalTitle , Modale , modalComps , modalBtn , perPage , pageShow } = this.state ;  

		let items = [];

		let page = Math.ceil( contacts.length / perPage ) ;

		for (let number = 1; number <= page; number++) {
		  	items.push(
		    	<Pagination.Item onClick={ ()=> this.changePage(number) } key={number} active={number === pageShow}>
		      		{number}
		    	</Pagination.Item>,
		  	);
		}

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
						  	{contactsShow.map((e)=>{
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
			<Col xs={12} >
				{page>1?<Pagination>{items}</Pagination>:''}
    			<br />
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