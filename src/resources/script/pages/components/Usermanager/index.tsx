import * as React from 'react'
import { Row , Col , ListGroup , Badge } from 'react-bootstrap';

import lang from '../../../libs/lang' ;

import { user } from '../../interface/user' ;

import userStore from '../../stores/userStore' ;


interface searchTagProps {
	
	editePrice : ( ) => void

} 

interface searchTagStade {
	
	users : user[]

} 

export default class SearchTag extends React.Component<searchTagProps,searchTagStade>{

	private store : userStore = new userStore()

	constructor(props){

		super(props) ;

		this.state = {
			users  :  [] , 
		}

		this.store.onChange(( store )=>{
			this.setState( {users : store.users }) ; 
		}) 

	}

	componentDidMount(){

		this.initUser()

	}

	async initUser(){

		await this.store.find()
		//@todo : close loader iCI

	}

	render(){

		let { editePrice } = this.props ; 
		let { users } = this.state ; 

		return <Row>
					<Col>
			    		<ListGroup>
						  	<ListGroup.Item variant="dark" >{lang('Manager_user')}</ListGroup.Item>
						  	{users.map((e)=>{
						  		return <ListGroup.Item key={e.id}>
						  			{e.family_name} {e.given_name}  
						  			<Badge className="on-hover btn-left" onClick={ ()=> editePrice() } pill variant="info">{lang('edit_price')} </Badge>
						  		</ListGroup.Item>
						  	})}
						</ListGroup>	
			    	</Col>
		  		</Row> 
	}



}