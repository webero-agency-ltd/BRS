import * as React from 'react'
import { Row , Col , ListGroup , Badge } from 'react-bootstrap';

import lang from '../../../libs/lang' ;

import { produit } from '../../interface/produit' ;

import produitStore from '../../stores/produitStore' ;


interface searchTagProps {

	editePage : ( data : string ) => void

} 

interface searchTagStade {
	
	produits : produit[]

} 

export default class SearchTag extends React.Component<searchTagProps,searchTagStade>{

	private store : produitStore = new produitStore()

	constructor(props){

		super(props) ;

		this.state = {
			produits  :  [] , 
		}

		this.store.onChange(( store )=>{
			this.setState( {produits : store.produits }) ; 
		}) 

	}

	async componentDidMount(){

		await this.store.find()
		//@todo : close loader iCI

	}

	async supr( produit : produit ){

		let deleted = await this.store.removeProduit( produit )
		if ( deleted ) {
	    	window.location.reload() ; 
		}

	}

	edit( produit : produit ){

		alert('EDITE PRODUIT : ' + produit.id ) 

	}

	render(){

		let { editePage } = this.props ; 
		let { produits } = this.state ; 

		return <Row>
					<Col>
			    		<ListGroup>
						  	<ListGroup.Item variant="dark" >{lang('ProduitTitle')} <Badge className="on-hover btn-left" onClick={ ()=> editePage('Page 1') } pill variant="info">+ {lang('modalProduitNew')} </Badge></ListGroup.Item>
						  	{produits.map((e)=>{
						  		return <ListGroup.Item key={e.id}>
						  			{e.name} 
						  			<Badge className="on-hover btn-left" onClick={ ()=>this.supr( e ) } pill variant="danger">{lang('modalProduitDelete')} </Badge>
						  			<Badge className="on-hover btn-left" onClick={ ()=>this.edit( e ) } pill variant="info">{lang('modalProduitEdit')} </Badge>
						  		</ListGroup.Item>
						  	})}
						</ListGroup>	
			    	</Col>
		  		</Row> 
	}



}