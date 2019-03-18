
import * as React from 'react'
import { Table , Row , Col , Button , Container , Pagination , Form , Popover , OverlayTrigger } from 'react-bootstrap';

import { contacts } from '../../interface/contacts' ;

import contactsStore from '../../stores/contactsStore' ;

import lang from '../../../libs/lang' ;

import Loader from '../Loader/'

import Modals from '../Modale/'

import { Moment } from 'moment' ;

let moment = require('moment');

interface filter{

	dateFrom : string , 
	dateTo : string , 
	Type : string , 
	Product : string , 
	LastName : string , 
	FirstName : string , 
	Payement : string 

}

interface props {

} 

interface state {

	contacts : contacts[]
	contactsShow : contacts[]
	contactsShowable : contacts[]
	Loadershow : boolean
	
	Modale : boolean 
	modalComps : string 
	modalTitle : string
	modalBtn : object 

	//pagination information
	perPage : number , 
	pageShow : number , 

	filter : filter , 
	products : any[] , 

	dateMax : Moment , 
	dateMin : Moment , 

} 

export default class Recherche extends React.Component<props,state>{

	private store : contactsStore = new contactsStore(2)

	constructor(props){

		super(props) ; 

		this.state = {

			contactsShow : [] , 
			contacts  :  [] , 
			contactsShowable  :  [] , 
			Loadershow  : true , 

			Modale  : false , 
			modalComps  : '' , 
			modalTitle : '' ,
			modalBtn : {} , 

			perPage : 4 , 
			pageShow : 1 ,

			filter : {

				dateFrom : null , 
				dateTo : null , 
				Type : '' , 
				Product : '' , 
				LastName : '' , 
				FirstName : '' , 
				Payement : '' 

			} ,  

			//liste des produit fa faire des filtre
			products : [] , 
			dateMax : null , 
			dateMin : null , 

		}

		this.store.onChange(( store )=>{
			//selectionner tout les nom du produit 

			this.findProducts( store.contacts ) ; 
			this.setState( {contactsShowable : [...store.contacts] , contactsShow : this.paginateListe( store.contacts , this.state.pageShow ) ,contacts : store.contacts , Loadershow : false }) ; 
		})

		this.handleClick = this.handleClick.bind(this);

		this.dateFilterFrom = this.dateFilterFrom.bind(this);
		this.dateFilterTo = this.dateFilterTo.bind(this);
		this.filterType = this.filterType.bind(this);
		this.filterProduct = this.filterProduct.bind(this);
		this.filterLastName = this.filterLastName.bind(this);
		this.filterFirstName = this.filterFirstName.bind(this);
		this.filterPayement = this.filterPayement.bind(this);
		this.filterRun = this.filterRun.bind(this);

	}

	paginateListe( contacts : contacts[] , page : number ){

		let liste = [...contacts].slice((page-1) * this.state.perPage, (page) * this.state.perPage) ; 
		return  liste ;

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

	changePage( page : number ){

		if ( page !== this.state.pageShow ) {
			this.setState( { pageShow: page } ) ; 
			this.setState( { contactsShow : this.paginateListe( this.state.contactsShowable , page ) } ) ;  
		}

 	}

 	/*
	*	Récupération de tout les nom du produit ans le store
 	*/
 	findProducts( contact : contacts[] ){

 		this.finLimiteDate( contact )
 		let products = contact.map( e => e.produit )
 		products = products.filter((v,i) => products.indexOf(v) == i)
 		this.setState({products})

 	}

 	/*
	*	Séléction de tout les date trouver et trouver un minimum et un maximum
 	*/
 	finLimiteDate( contact : contacts[] ){
 		
 		let min = moment() ; 
 		let max = moment() ;

 		contact.forEach(e=>{

 			let now = moment();
			if (e.date > max) {
			   max = e.date ; 
			} else if (e.date < min){
			   min = e.date
			}

 		})

		let dateFrom = min.format('YYYY-MM-DD') ; 
		let dateTo = max.format('YYYY-MM-DD') ; 
 		let filter = {...this.state.filter,dateFrom,dateTo}

		this.setState( {dateMin:min,dateMax:max,filter} )
		
 	}

 	/*
	* Filter 
 	*/
 	dateFilterFrom( e ){

 		let dateFrom = (e.target as HTMLInputElement ).value ; 
 		let filter = {...this.state.filter,dateFrom}
 		this.setState( {filter} )  ;
 		this.filterRun( filter ) ; 
 		
 	}

 	dateFilterTo( e ){

 		let dateTo = (e.target as HTMLInputElement ).value ; 
 		let filter = {...this.state.filter,dateTo}
 		this.setState( {filter} )  ;
 		this.filterRun( filter ) ;  

 	}

 	filterType( e ){

 		let Type = (e.target as HTMLInputElement ).value ; 
 		let filter = {...this.state.filter,Type}
 		this.setState( {filter} )  ; 
 		this.filterRun( filter ) ; 

 	}

	filterProduct( e ){

		let Product = (e.target as HTMLInputElement ).value ; 
 		let filter = {...this.state.filter,Product}
 		this.setState( {filter} )  ; 
 		this.filterRun( filter ) ;

	}
	
	filterLastName( e ){

		let LastName = (e.target as HTMLInputElement ).value ; 
 		let filter = {...this.state.filter,LastName}
 		this.setState( {filter} )  ; 
 		this.filterRun( filter ) ;

	}
	
	filterFirstName( e ){

		let FirstName = (e.target as HTMLInputElement ).value ; 
 		let filter = {...this.state.filter,FirstName}
 		this.setState( {filter} )  ; 
 		this.filterRun( filter ) ;

	}

	filterPayement( e ){

		let Payement = (e.target as HTMLInputElement ).value ; 
 		let filter = {...this.state.filter,Payement}
 		this.setState( {filter} )  ; 
 		this.filterRun( filter ) ;

	}

	//appliqué la filtre 
	filterRun( filter : filter ){
		
		let contactsShowable = this.state.contacts.filter(e =>{

			//filte de date
			if ( e.date < moment( filter.dateFrom , 'YYYY-MM-DD' ) || e.date > moment( filter.dateTo , 'YYYY-MM-DD' ) ) {
				return false;
			}

			if ( filter.FirstName && e.first_name.toLowerCase().indexOf( filter.FirstName.toLowerCase() ) === -1 ) {
				return false;
			}
			if ( filter.LastName && e.last_name.toLowerCase().indexOf( filter.LastName.toLowerCase() ) === -1 ) {
				return false;
			}
			if ( filter.Payement && e.payement.toLowerCase().indexOf( filter.Payement.toLowerCase() ) === -1 ) {
				return false;
			}
			if ( filter.Product && e.produit.toLowerCase().indexOf( filter.Product.toLowerCase() ) === -1 ) {
				return false;
			}
			if ( filter.Type && e.type.toLowerCase().indexOf( filter.Type.toLowerCase() ) === -1 ) {
				return false;
			}
			return true;

		})

		let contactsShow = this.paginateListe( contactsShowable , this.state.pageShow )  ; 
		this.setState( { contactsShow , contactsShowable }) ; 
		this.changePage( 1 );

	}
	
	handleCloseModal(){
		this.setState( { Modale: false , modalComps : '' , modalTitle : '' } ) ; 
	}

	handleClick ({ target }) {

		

    };

	render(){

		let { 
			dateMax , 
			dateMin , 
			contactsShowable , 
			products , 
			filter , 
			contactsShow , 
			contacts , 
			Loadershow , 
			modalTitle , 
			Modale , 
			modalComps , 
			modalBtn , 
			perPage , 
			pageShow 
		} = this.state ;  

		let items = [];

		let page = Math.ceil( contactsShowable.length / perPage ) ;

		for (let number = 1; number <= page; number++) {
		  	items.push(
		    	<Pagination.Item onClick={ ()=> this.changePage(number) } key={number} active={number === pageShow}>
		      		{number}
		    	</Pagination.Item>,
		  	);
		}
		

		/*
		*	Popover filtre date
		*/
		const popoverDate = (

			<Popover id="date-popover" >
				{dateMin?<Form.Group controlId="formGridEmail">
			      	<Form.Label>From</Form.Label>
			      	<Form.Control onChange={ this.dateFilterFrom }  value={filter.dateFrom} type="date" placeholder="Date début" />
			    </Form.Group>:''}
				{dateMax?<Form.Group controlId="formGridEmail">
			      	<Form.Label>To</Form.Label>
			      	<Form.Control onChange={ this.dateFilterTo }  value={filter.dateTo} type="date" placeholder="Date fin" />
			    </Form.Group>:''}
		  	</Popover>
		  	
		);

		return <Container> <Row>
			<Col xs={12} >
				<Button variant="warning" onClick={ ()=> this.editePageRecherche() } >{lang('r_search_option')}</Button>
			</Col>
			<Col xs={12} >
				<div className="tspace-1 over-content" >
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
					  		<tr>
						      	<td>
						      		<div className="filter">
						      			<OverlayTrigger trigger="click" placement="right" overlay={popoverDate}>
											<Button variant="link" onClick={this.handleClick} >Filter date</Button>
										</OverlayTrigger>
						      		</div>
						      	</td>
						      	<td>
						      		<div className="filter">
						      			<Form.Group controlId="filterType">
										    <Form.Control value={ filter.Type } onChange={ this.filterType } as="select">
										        <option value="">All</option>
										        <option value="Level 1">{lang('level1')}</option>
										        <option value="Level 2">{lang('level2')}</option>
										    </Form.Control>
									    </Form.Group>
						      		</div>
						      	</td>
						      	<td>
									<div className="filter">
										<Form.Group controlId="filterProduct">
									    <Form.Control value={ filter.Product } onChange={ this.filterProduct } as="select">
										    <option value="">All</option>    
									        {products.map(e=><option key={e} value={e}>{e}</option>)}
									    </Form.Control>
								    </Form.Group>
									</div>
								</td>
								<td>
									<div className="filter">
										<Form.Group controlId="filterLastName">
									    <Form.Control value={ filter.LastName } onChange={ this.filterLastName } placeholder={lang('filter_last_name')} />
									</Form.Group>
									</div>
								</td>
								<td>
									<div className="filter">
										<Form.Group controlId="filterFirstName">
									    <Form.Control value={ filter.FirstName } onChange={ this.filterFirstName } placeholder={lang('filter_first_name')} />
									</Form.Group>
									</div>
								</td>
								<td></td>
								<td>
									<div className="filter">
										<Form.Group controlId="filterPayement">
									    <Form.Control value={ filter.Payement } onChange={ this.filterPayement } as="select">
										    <option value="">All</option>    
									        <option>{lang('commition_pas_encore_paye')}</option>
									        <option>{lang('commition_en_Cours')}</option>
									        <option>{lang('commition_paye')}</option>
									    </Form.Control>
								    </Form.Group>
									</div>
								</td>
						    </tr>
						  	{contactsShow.map((e)=>{
							    return <tr key={e.id} >
							      	<td>{e.date['format']('DD-MM-YYYY') }</td>
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
				<div className="tspace-1">
					{page>1?<Pagination>{items}</Pagination>:''}
	    			<br />
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
