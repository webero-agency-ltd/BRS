import * as React from 'react'
import reactDom from 'react-dom'

import Modals from './components/Modale/'
import { Table , Nav , Container , Row , Col } from 'react-bootstrap';

import Dashboard from './components/Dashboard/'
import Recherche from './components/Recherche/'
import Affilier from './components/Affilier/'
import NoMatch from './components/NoMatch/'

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

	Modale : boolean 
	modalComps : string 
	modalTitle : string
	modalBtn : object

} 


class Application extends React.Component <appProps , appState>{

	constructor( props ){

		super( props )

		this.state = {

			Modale  : false , 
			modalComps  : '' , 
			modalTitle : '' ,
			modalBtn : {} ,

		}

	}

	/*
	*	Close modale qui serait afficher 
	*/
	handleCloseModal(){

		this.setState( { Modale: false , modalComps : '' , modalTitle : '' } ) ; 

	}

	/*
	*	Affichage du modale 
	*/

	handleShowModal( modalComps : string , modalTitle : string , modalBtn = {} ){
		this.setState( { Modale: true , modalComps , modalTitle , modalBtn } ) ; 
	
	}

	editePageRecherche(){

		this.handleShowModal(
			'EditePageRecherche' , 
			lang('modalEditPageTitle',{ name }),
			{ submit: 'Crée le tag' , cancel : 'suprimer le tag'})

	}

	render(){

		const  {} = this.state

		const { Modale , modalComps , modalTitle , modalBtn } = this.state

		return <Router><Container>
				<Row className="tspace-2 bspace-2">
					<Col>
						<Nav variant="pills" activeKey="un" >
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
					<Route exact path="/" component={Dashboard} />
					<Route path="/recherche" 
						component={ (props) => <Recherche editePageRecherche={ ()=> this.editePageRecherche() } />} 
						/>
		        	<Route path="/affilier" component={Affilier} />
					<Route component={NoMatch} />
				</Switch>
				<Modals 
					title={ modalTitle }
					show={ Modale } 
					type={ modalComps }
					btn={ modalBtn }
					closeModal={ () => this.handleCloseModal() }
					></Modals>
		</Container></Router>

	}

} 

reactDom.render(
	<Application/>,
	document.getElementById('app') as Element
)
