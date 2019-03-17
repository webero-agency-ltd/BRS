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
	name : string 
	value : string 

} 


export default class EditePage extends React.Component<searchTagProps,searchTagState>{

	private store : tagStore = new tagStore(2)

	constructor(props){

		super(props) ; 

		this.state = {
			tags  :  [] , 
			name : '' ,
			value : '' ,
		}

		this.store.onChange(( store )=>{
			this.setState( {tags : store.tags }) ; 
		})

		this.updateTextTag = this.updateTextTag.bind(this);
		this.updateValueTag = this.updateValueTag.bind(this);
		this.onSubmite = this.onSubmite.bind(this);

	}

	componentDidMount(){ 

		this.store.find() ; 

	}

	async onSubmite() {
	    
	    /*if ( setStore ) { this.props.close() ;  }*/

	    if( !this.state.name || !this.state.value )
			return ;
		
		let isadd = await this.store.addTag( this.state.name , this.state.value ) ; 

		if ( isadd ) {
			this.setState({name : ''}) ; 
			this.setState({value : ''}) ; 
		}

	}

	supr( tag : tag ){

		this.store.removeTag( tag ) ; 

	}

	updateTextTag( e ){

		this.setState({ name : (e.target as HTMLInputElement ).value }) ; 

	}

	updateValueTag( e ){

		this.setState({ value : (e.target as HTMLInputElement ).value }) ;  

	}

	render(){
		
		let { tags , name , value } = this.state ; 

		return <div>

			<div>
				<ListGroup>
				  	{tags.map((e)=>{
				  		return <ListGroup.Item key={e.id}>
				  			{e.name} ({e.value})
				  			<Badge className="on-hover btn-left" onClick={ ()=>this.supr( e ) } pill variant="info">{lang('modalDelTag')} </Badge>
				  		</ListGroup.Item>
				  	})}
				</ListGroup>
			</div>
			<hr/>
			<div>
				<Form>
					<Form.Group>
					    <Form.Control value={ name } onChange={ this.updateTextTag } type="text" placeholder={ lang('tag_name') } />
					</Form.Group>
					<Form.Group>
					    <Form.Control value={ value } onChange={ this.updateValueTag } type="text" placeholder={ lang('tag_value') } />
					</Form.Group> 
				</Form>
			</div>
		</div>

	}
	

}
