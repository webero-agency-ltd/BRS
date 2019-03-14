import * as React from 'react'
import { Badge , Button , FormControl , ListGroup , Form } from 'react-bootstrap';

import lang from '../../../libs/lang' ;

import { tag } from '../../interface/tag' ;

import tagStore from '../../stores/tagStore' ;


interface searchTagProps {

	close : ()=> void ,

} 

interface searchTagState {
	
	tags : tag[]
	temptag : tag[]
	attache : tag[]
	id : string 

} 


export default class EditePage extends React.Component<searchTagProps,searchTagState>{

	private store : tagStore = new tagStore(2,true)

	constructor(props){

		super(props) ; 

		this.state = {
			tags  :  [] , 
			temptag  :  [] , 
			attache  :  [] , 
			id : '' ,
		}

		this.store.onChange(( store )=>{
			this.setState( {temptag : store.tags }) ; 
		})

		this.updateIdTag = this.updateIdTag.bind(this);
		this.onSubmite = this.onSubmite.bind(this);

	}

	componentDidMount(){ 
		  
		this.initattache() ;

	}

	//initialisation du fichier attacher 
	async initattache(){

		await this.store.find() ;

		let attache = await this.store.findAttacheTag() ;
		this.setState({ attache }) ;
		this.setState( {tags : this.excludeAttache( this.state.temptag , attache ) }) ; 

	}

	async onSubmite() {

		//récupération des tags dans l'ID est selectionner	
		let isadd = await this.store.attacheTag( this.state.id ) ; 
		if ( isadd ) {
			this.initattache() ;
		}

	}

	async supr( tag : tag ){

		await this.store.dettacheTag( tag.id+'' ) ; 
		this.initattache() ;

	}

	updateIdTag( e ){

		this.setState({ id : (e.target as HTMLInputElement ).value }) ; 
	
	}

	/*
	*	Exclure le tag qui existe dans attache 
	*/
	excludeAttache( tags : tag[] , attache : tag[] ) : tag[] {

		let af = attache.map(e=>e.id) ;
		let r = tags.filter(e=>!af.includes(e.id)) ;
		if (r.length>0) {
			this.setState( {id:(r[0].id)+''} ) ; 
		}
		return r;

	}

	render(){
		
		let { tags , id , attache } = this.state ; 

		return <div>

			<div>
				<ListGroup>
				  	{attache.map((e)=>{
				  		return <ListGroup.Item key={e.id}>
				  			{e.name} ({e.value})
				  			<Badge className="on-hover btn-left" onClick={ ()=>this.supr( e ) } pill variant="info">{lang('delete')} </Badge>
				  		</ListGroup.Item>
				  	})}
				</ListGroup>
			</div>
			<hr/>
			<div>
				<div>
					<Form.Group>
						<Form.Label>{ lang('tag_rull') }</Form.Label>
						<Form.Control value={ id } onChange={ this.updateIdTag } as="select">
							{tags.map((e)=>{
						  		return  <option value={e.id}  key={e.id}>{e.name}</option>
						  	})}
					    </Form.Control>
					</Form.Group>
				</div>

			</div>
		</div>

	}
	

}
