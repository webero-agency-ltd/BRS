import * as React from 'react'
import { Badge , Button , FormControl , ListGroup , Form } from 'react-bootstrap';

import lang from '../../../libs/lang' ;

import { tag } from '../../interface/tag' ;

import produitStore from '../../stores/produitStore' ;

import userStore from '../../stores/userStore' ;

import { produit } from '../../interface/produit' ;

import forearch from '../../../libs/forearch.js' ;


interface priceProps {

	close : ()=> void ,

} 

interface priceState {
	
	produits : produit[]
	user : string
	price : object 
} 

export default class EditePage extends React.Component<priceProps,priceState>{

	private produit : produitStore = new produitStore()

	private user : userStore = new userStore()

	constructor(props){

		super(props) ; 

		this.state = {
			produits  :  [] , 
			user  : 'Dupon Duroy', 
			price  : {}, 
		}

		this.produit.onChange(( store )=>{
			let price = {} ;
			store.produits.map( e=>{
				let prix = 0 ;
				e.prixUser?prix=e.prixUser:'';
				price[e.id+'product_id']=prix ; 
			})
			this.setState({price}) ; 
			this.setState({produits : store.produits}) ; 
		})

		this.onSubmite = this.onSubmite.bind(this);
		this.updatePrice = this.updatePrice.bind(this);
		this.resetPrice = this.resetPrice.bind(this);

	}

	componentDidMount(){ 

		this.initEdit() ; 

	}

	async initEdit(){

		await this.produit.find() ;  
		//pour chaque produit trouver , récupére la liste des prix attacher 

	}

	async onSubmite() {
	    
	    let each = forearch( this.state.produits , async (data,next) => {
	    	let p = data as produit ; 
	    	await this.produit.attacheProduit( p , this.state.price[ p.id+'product_id' ] ); 
	    	next() ; 
	    })

	    each.end(()=>{
	    	this.props.close() ;
	    })

	    each.run() ;  

	}

	async resetPrice(){

		await this.produit.deattacheProduit( );  
		this.props.close() ;

	}

	updatePrice( e , id : number ){

		this.state.price[ id+'product_id' ] = (e.target as HTMLInputElement ).value ; 
		this.setState({ price : this.state.price }) ;

	}

	render(){
		
		let { produits , user , price } = this.state ; 

		return <div>

			<h6>{ lang('product_price_user',{user}) } <Button onClick={ this.resetPrice } variant="link">Reset</Button></h6>
			<hr/>
			<div>
				<Form>
					{produits.map((e)=>{
				  		return <Form.Group key={e.id} >
							<Form.Label>{ e.name }</Form.Label>
						    <Form.Control value={ price[e.id+'product_id'] } onChange={ (i)=>this.updatePrice(i,e.id) } type="text" placeholder={ lang('tag_value') } />
						</Form.Group>
				  	})}
				</Form>
			</div>
		</div>

	}
	

}