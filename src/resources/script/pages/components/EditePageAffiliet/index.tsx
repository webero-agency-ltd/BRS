import * as React from 'react'
import { Badge , Button , FormControl , ListGroup , Form } from 'react-bootstrap';

import lang from '../../../libs/lang' ;

import { tag } from '../../interface/tag' ;

import tagStore from '../../stores/tagStore' ;

import configStore from '../../stores/configStore' ;


interface searchTagProps {

	close : ()=> void ,

} 

interface searchTagState {
	
	tags : tag[]
	name : string 
	value : string 
	rull : string 

} 

export default class EditePage extends React.Component<searchTagProps,searchTagState>{

	private store : tagStore = new tagStore(1)

	private config : configStore = new configStore()

	constructor(props){

		super(props) ; 

		this.state = {
			tags  :  [] , 
			name : '' ,
			value : '' ,
			rull : '1' , 
		}

		this.store.onChange(( store )=>{
			this.setState( {tags : store.tags }) ; 
		})

		this.updateNewTag = this.updateNewTag.bind(this);
		this.updateOpTag = this.updateOpTag.bind(this);
		this.onSubmite = this.onSubmite.bind(this);

	}

	componentDidMount(){ 

		this.store.find() ; 

		this.initEdit() ; 

	}

	async initEdit(){

		let rull = await this.config.find('rull') ;
		this.setState( {rull} ) ; 

	}

	async onSubmite() {
	    
	    /*if ( setStore ) { this.props.close() ;  }*/

	    if( !this.state.value || !this.state.rull )
			return ;
		
		let isadd = await this.store.addTag( '',this.state.value,this.state.rull ) ; 

		if ( isadd ) {
			this.setState({value : ''}) ; 
		}

	}

	supr( tag : tag ){
		this.store.removeTag( tag ) ; 
	}

	updateNewTag( e ){

		this.setState({ value : (e.target as HTMLInputElement ).value }) ; 

	}

	async updateOpTag( e ){

		let value = (e.target as HTMLInputElement ).value ; 
		this.setState({ rull : value }) ;  
		let isadd = await this.config.editConfig( 'rull',value ) ; 

	}

	render(){
		
		let { tags , value , rull } = this.state ; 

		return <div>
			<div>
				<Form.Group>
					<Form.Label>{ lang('tag_rull') }</Form.Label>
					<Form.Control value={ rull } onChange={ this.updateOpTag } as="select">
				      	<option value="1" >{lang('tag_rull1')}</option>
				      	<option value="2" >{lang('tag_rull2')}</option>
				     	<option value="3" >{lang('tag_rull3')}</option>
				    </Form.Control>
				</Form.Group>
			</div>
			<hr/>
			<div>
				<ListGroup>
				  	{tags.map((e)=>{
				  		return <ListGroup.Item key={e.id}>
				  			{ e.name!==''?e.name:e.value } 
				  			<Badge className="on-hover btn-left" onClick={ ()=>this.supr( e ) } pill variant="info">{lang('delete')} </Badge>
				  		</ListGroup.Item>
				  	})}
				</ListGroup>
			</div>
			<hr/>
			<div>
				<Form>
					<Form.Group>
					    <Form.Control value={ value } onChange={ this.updateNewTag } type="text" placeholder={ lang('tag_value') } />
					</Form.Group>
				</Form>
			</div>
		</div>

	}
	

}