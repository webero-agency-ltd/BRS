
import * as React from 'react'
import { Table , Row , Col , Nav } from 'react-bootstrap';

export default class Tableaux extends React.Component{

	render(){
		return <Row>
			<Col>
				<div className="tspace-1 bspace-1">
					<Nav variant="pills" activeKey="un" >
						<Nav.Item>
						    <Nav.Link href="/" eventKey="un">Menu 1</Nav.Link>
						</Nav.Item>
						<Nav.Item>
						    <Nav.Link eventKey="deux">Menu 2</Nav.Link>
						</Nav.Item>
					</Nav>
				</div>
			</Col>
		</Row>;
	}

	

}