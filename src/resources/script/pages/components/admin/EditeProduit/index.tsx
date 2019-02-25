import * as React from 'react'
import { Badge , Button , FormControl , ListGroup , Form } from 'react-bootstrap';

import lang from '../../../../libs/lang' ;
import { tag } from '../../../interface/tag' ;
import tagStore from '../../../stores/tagStore' ;

interface searchTagProps {
	close : ()=> void ,
} 

interface searchTagState {
	
	name : string , 
	prix_lv1 : string , 
	prix_lv2 : string , 
	tag : string , 

} 

export default class EditePage extends React.Component<searchTagProps,searchTagState>{

	private store : tagStore = new tagStore()

	constructor(props){

		super(props) ; 

		this.state = {

			name : '' , 
			prix_lv1 : '' , 
			prix_lv2 : '' , 
			tag : '' , 

		}

		this.store.onChange(( store )=>{
			//this.setState( {tags : store.tags }) ; 
		})

	}

	async onSubmite() {
	    /*
		
	    let setStore = await this.store.storeTags( this.state.opTag ) ; 
	    if ( setStore ) {
	    	this.props.close() ; 
	    }
	    */

	}

	render(){
		
		let { name , prix_lv1 , prix_lv2 , tag } = this.state ; 

		return <div>
			<Form>
				<Form.Group>
				    <Form.Control value={ name } type="text" placeholder={ lang('modalTagInput') } />
				</Form.Group>
				<Form.Group>
				    <Form.Control value={ prix_lv1 } type="text" placeholder={ lang('modalTagInput') } />
				</Form.Group>
				<Form.Group>
				    <Form.Control value={ prix_lv2 } type="text" placeholder={ lang('modalTagInput') } />
				</Form.Group>
				<Form.Group>
				    <Form.Control value={ tag } type="text" placeholder={ lang('modalTagInput') } />
				</Form.Group>
			</Form>
		</div>;

	}
	

}