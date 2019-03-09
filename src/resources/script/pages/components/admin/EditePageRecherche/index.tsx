import * as React from 'react'
import { Badge , Button , FormControl , ListGroup , Form } from 'react-bootstrap';

import lang from '../../../../libs/lang' ;

import { tagSearch } from '../../../interface/tagSearch' ;

import tagSearchStore from '../../../stores/tagSearchStore' ;


interface searchTagProps {

	close : ()=> void ,

} 

interface searchTagState {
	
	tags : tagSearch[]
	textTag : string 
	valueTag : string 

} 


export default class EditePage extends React.Component<searchTagProps,searchTagState>{

	private store : tagSearchStore = new tagSearchStore()

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

		this.updateTextTag = this.updateTextTag.bind(this);
		this.updateValueTag = this.updateValueTag.bind(this);
		this.onSubmite = this.onSubmite.bind(this);

	}

	componentDidMount(){

		//this.setState({ opTag : await this.store.find() }) ; 

	}

	async onSubmite() {
	    
	    /*let setStore = await this.store.storeTags( this.state.opTag ) ; 
	    if ( setStore ) {
	    	
	    }*/

	    if( ! this.state.textTag || ! this.state.valueTag )
			return ;
		let res = await this.store.addTag( this.state.textTag , this.state.valueTag )
		if ( res ) {
			//this.props.close() ; 
			this.setState({textTag : '',valueTag : ''}) ; 
		}

	}

	supr( tag : tagSearch ){

		this.store.removeTag( tag ) ; 

	}

	updateTextTag( e ){

		this.setState({ textTag : (e.target as HTMLInputElement ).value }) ; 

	}

	updateValueTag( e ){

		this.setState({ valueTag : (e.target as HTMLInputElement ).value }) ;  

	}

	render(){
		
		let { tags , valueTag , textTag } = this.state ; 

		return <div>

			<div>
				<ListGroup>
				  	{tags.map((e)=>{
				  		return <ListGroup.Item key={e.id}>
				  			{e.textTag} => {e.valueTag}
				  			<Badge className="on-hover btn-left" onClick={ ()=>this.supr( e ) } pill variant="info">{lang('modalDelTag')} </Badge>
				  		</ListGroup.Item>
				  	})}
				</ListGroup>
			</div>
			
			<div>

				<Form>

					<Form.Group>
					    <Form.Control value={ textTag } onChange={ this.updateTextTag } type="text" placeholder={ lang('modaltextTag') } />
					</Form.Group>

					<Form.Group>
					    <Form.Control value={ valueTag } onChange={ this.updateValueTag } type="text" placeholder={ lang('modalvalueTag') } />
					</Form.Group> 

				   	<Button onClick={ this.onSubmite } variant="outline-secondary">{lang('modalTagAdd')}</Button>
				</Form>
			</div>
		</div>

	}
	

}
