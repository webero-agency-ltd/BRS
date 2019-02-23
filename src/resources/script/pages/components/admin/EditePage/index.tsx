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
	newTag : string 
	opTag : string 

} 


export default class EditePage extends React.Component<searchTagProps,searchTagState>{

	private store : tagStore = new tagStore()

	constructor(props){

		super(props) ; 

		this.state = {
			tags  :  [] , 
			newTag : '' ,
			opTag : '1' , 
		}

		this.store.onChange(( store )=>{
			this.setState( {tags : store.tags }) ; 
		})

		this.updateNewTag = this.updateNewTag.bind(this);
		this.updateOpTag = this.updateOpTag.bind(this);
		this.addTag = this.addTag.bind(this);

	}

	async componentDidMount(){

		this.setState({ opTag : await this.store.find() }) ; 

	}

	async onSubmite() {
	    
	    let setStore = await this.store.storeTags( this.state.opTag ) ; 
	    if ( setStore ) {
	    	this.props.close() ; 
	    }

	}

	supr( tag : tag ){

		this.store.removeTag( tag ) ; 

	}

	addTag(){

		if( ! this.state.newTag )
			return ;

		this.store.addTag( this.state.newTag )
		this.setState({newTag : ''}) ; 

	}

	updateNewTag( e ){

		this.setState({ newTag : (e.target as HTMLInputElement ).value }) ; 

	}

	updateOpTag( e ){

		this.setState({ opTag : (e.target as HTMLInputElement ).value }) ;  

	}

	render(){
		
		let { tags , newTag , opTag } = this.state ; 

		return <div>

			<div>
				<ListGroup>
				  	{tags.map((e)=>{
				  		return <ListGroup.Item key={e.id}>
				  			{e.text} 
				  			<Badge className="on-hover btn-left" onClick={ ()=>this.supr( e ) } pill variant="info">{lang('modalDelTag')} </Badge>
				  		</ListGroup.Item>
				  	})}
				</ListGroup>;
			</div>
			<div>

				<Form>

					<Form.Group>
					    <Form.Control value={ newTag } onChange={ this.updateNewTag } type="text" placeholder={ lang('modalTagInput') } />
					</Form.Group>

					<Form.Group>
						<Form.Control value={ opTag } onChange={ this.updateOpTag } as="select">
					      	<option value="1" >{lang('modalSelect1')}</option>
					      	<option value="2" >{lang('modalSelect2')}</option>
					     	<option value="3" >{lang('modalSelect3')}</option>
					    </Form.Control>
					</Form.Group>

				   	<Button onClick={ this.addTag } variant="outline-secondary">{lang('modalTagAdd')}</Button>
				</Form>
			</div>
		</div>;

	}
	

}