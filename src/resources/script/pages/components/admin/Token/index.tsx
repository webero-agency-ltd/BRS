import * as React from 'react'
import { Row , Col , Alert , Button } from 'react-bootstrap';

import lang from '../../../../libs/lang' ; 

export default class Token extends React.Component{

	private stadeToken : boolean ; 
	
	private lastRefresh : Date ; 

	constructor(props){

		super(props) ; 
 
		this.stadeToken = window.isToken ;

		//this.lastRefresh = NOW() ; 

	}

	render(){

		return <Row>
	    	<Col>
	    		<Alert variant="primary">
					<Row>
						{ this.stadeToken ? <Col sm={8}>{lang('TokenSuccess')}</Col> : <Col sm={8}>{lang('TokenError')}</Col> }
						<Col sm={4}>
				    		<Button className="btn-left" onClick={()=>{ this.refresh() }} variant="light" >Refraiche NOW</Button>
				    	</Col>
				  	</Row>
				</Alert>
	    	</Col>
	  	</Row> ;
	}

	refresh(){

		alert('TOKEn refresh') ; 

	}

}