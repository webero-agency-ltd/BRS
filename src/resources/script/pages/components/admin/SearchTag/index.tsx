import * as React from 'react'
import { Row , Col , ListGroup , Badge } from 'react-bootstrap';

import lang from '../../../../libs/lang' ;

interface searchTagProps {

	editePage : ( data : string ) => void

} 

interface searchTagStade {
	
} 

export default class SearchTag extends React.Component<searchTagProps,searchTagStade>{

	constructor(props){

		super(props) ; 

	}

	render(){

		let { editePage } = this.props ; 

		return <Row>
					<Col>
			    		<ListGroup>
						  	<ListGroup.Item variant="dark" >{lang('SearchTagTitle')}</ListGroup.Item>
						  	<ListGroup.Item>{lang('SearchTagPage')} <Badge className="on-hover btn-left" onClick={ ()=> editePage('Page 1') } pill variant="info">{lang('SearchTagPageEdit')} </Badge></ListGroup.Item>
						</ListGroup>
			    	</Col>
		  		</Row>
	}


}