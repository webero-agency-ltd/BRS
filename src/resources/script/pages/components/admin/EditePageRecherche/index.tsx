import * as React from 'react'
import { Badge , Button , FormControl , ListGroup , Form } from 'react-bootstrap';

import lang from '../../../../libs/lang' ;

import { tag } from '../../../interface/tag' ;

import tagStore from '../../../stores/tagStore' ;


interface searchTagProps {

	close : ()=> void ,

} 

interface searchTagState {
	
	tags : tag[]
	textTag : string 
	valueTag : string 

} 


export default class EditePage extends React.Component<searchTagProps,searchTagState>{

	private store : tagStore = new tagStore()

	constructor(props){

		super(props) ; 

		this.state = {
			tags  :  [] , 
			textTag : '' ,
			valueTag : '' , 
		}

		this.store.onChange(( store )=>{
			this.setState( {tags : store.tags }) ; 
		})

		this.updateNewTag = this.updateNewTag.bind(this);
		this.updateOpTag = this.updateOpTag.bind(this);
		this.addTag = this.addTag.bind(this);

	}

	async componentDidMount(){

		//this.setState({ opTag : await this.store.find() }) ; 

	}

	async onSubmite() {
	    
	    /*
		let setStore = await this.store.storeTags( this.state.opTag ) ; 
	    if ( setStore ) {
	    	this.props.close() ; 
	    }
	    */

	}

	supr( tag : tag ){

		this.store.removeTag( tag ) ; 

	}

	addTag(){

		/*
		if( ! this.state.textTag )
			return ;

		this.store.addTag( this.state.textTag )
		this.setState({textTag : ''}) ; 
		*/

	}

	updateNewTag( e ){

		//this.setState({ textTag : (e.target as HTMLInputElement ).value }) ; 

	}

	updateOpTag( e ){

		//this.setState({ opTag : (e.target as HTMLInputElement ).value }) ;  

	}

	render(){
		
		let { tags , valueTag , textTag } = this.state ; 

		return <div>

			<div>
				<ListGroup>
				  	{tags.map((e)=>{
				  		return <ListGroup.Item key={e.id}>
				  			{e.text} 
				  			<Badge className="on-hover btn-left" onClick={ ()=>this.supr( e ) } pill variant="info">{lang('modalDelTag')} </Badge>
				  		</ListGroup.Item>
				  	})}
				</ListGroup>
			</div>
			
			<div>

				<Form>

					<Form.Group>
					    <Form.Control value={ textTag } type="text" placeholder={ lang('modaltextTag') } />
					</Form.Group>

					<Form.Group>
					    <Form.Control value={ valueTag } onChange={ this.updateOpTag } type="text" placeholder={ lang('modalvalueTag') } />
					</Form.Group> 

				   	<Button onClick={ this.addTag } variant="outline-secondary">{lang('modalTagAdd')}</Button>
				</Form>
			</div>
		</div>

	}
	

}
