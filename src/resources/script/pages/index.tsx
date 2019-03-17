import * as React from 'react'
import reactDom from 'react-dom'

import { Table , Nav , Container , Row , Col } from 'react-bootstrap';

import Dashboard from './components/Dashboard/'
import Recherche from './components/Recherche/'
import Affilier from './components/Affilier/'
import NoMatch from './components/NoMatch/'
import Loader from './components/Loader/'

import lang from '../libs/lang' ;

import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";


declare global {

    namespace JSX { 
        interface IntrinsicElements {
            'Dashboard': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'Recherche': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'Affilier': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'NoMatch': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
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

		return <Router><Container>
				<Row className="tspace-2 bspace-2">
					<Col>
						<Nav variant="pills">
							<Nav.Item>
								<Link to="/">Dashboard</Link>
							</Nav.Item>
							<Nav.Item>
								<Link to="/recherche">Recherche</Link>
							</Nav.Item>
							<Nav.Item>
								<Link to="/Affilier">Contacts</Link>
							</Nav.Item>
						</Nav>
					</Col>
				</Row>
				<Switch>
					<Route exact path="/" 
						component={ (props) => <Dashboard />}
						/>
					<Route path="/recherche" 
						component={ (props) => <Recherche />} 
						/>
		        	<Route path="/affilier" 
		        		component={ (props) => <Affilier/>}
		        		/>
					<Route 
		        		component={ (props) => <NoMatch />}
						/>
				</Switch>
		</Container></Router>

	}

} 

reactDom.render(
	<Application/>,
	document.getElementById('app') as Element
)
