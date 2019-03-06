import * as React from 'react'
import reactDom from 'react-dom'

import Modals from './components/Modale/'
import { Table , Nav , Container , Row , Col } from 'react-bootstrap';

import Dashbord from './components/Dashbord/'
import Recherche from './components/Recherche/'
import Contacts from './components/Contacts/'
import lang from '../libs/lang' ;

import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";


declare global {

    namespace JSX { 
        interface IntrinsicElements {
            'Dashbord': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'Recherche': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'Contacts': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }

    interface Window { 
    	trans: object;
    	isToken: boolean;
    	urlFindToken:string ; 
    }

}

interface appProps {

}

interface appState {

} 


class Application extends React.Component <appProps , appState>{

	constructor( props ){

		super( props )

		this.state = {

		}

	}

	render(){

		const  {} = this.state

		return <Router><Container>
			<Row className="tspace-2 bspace-2">
				<Col>
					<Nav variant="pills" activeKey="un" >
						<Nav.Item>
							<Link to="/">Dashbord</Link>
						</Nav.Item>
						<Nav.Item>
							<Link to="/recherche">Recherche</Link>
						</Nav.Item>
						<Nav.Item>
							<Link to="/contacts">Contacts</Link>
						</Nav.Item>
					</Nav>
				</Col>
			</Row>
			<Switch>
				<Route exact path="/" component={Dashbord} />
				<Route path="/recherche" component={Recherche} />
	        	<Route path="/contacts" component={Contacts} />	
			</Switch>
		</Container></Router>

	}


}
 

reactDom.render(
	<Application/>,
	document.getElementById('app') as Element
)