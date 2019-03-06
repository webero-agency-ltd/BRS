
import * as React from 'react'
import { Table , Row , Col } from 'react-bootstrap';

interface searchTagProps {

} 

interface searchTagState {

} 

export default class Tableaux extends React.Component<searchTagProps,searchTagState>{

	constructor(props){

		super(props) ; 

		this.state = {
		
		}

	}

	render(){

		return <Row>
			<Col>
				Recherche
			</Col>
		</Row>
	}

}