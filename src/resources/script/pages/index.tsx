import * as React from 'react'
import reactDom from 'react-dom'

import Modals from './components/Modale/'
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

	Modale : boolean 
	modalComps : string 
	modalTitle : string
	modalBtn : object
	Loadershow : boolean

} 


class Application extends React.Component <appProps , appState>{

	constructor( props ){

		super( props )

		this.state = {

			Loadershow  : true , 
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
			'EditePageRechercheUser' , 
			lang('tagmanager_page_recherche_user'),
			{ submit: 'Ajouter tag' , cancel : lang('cancel')})

	}

	closeLoader(){

		setTimeout(()=>{
			this.setState({Loadershow:false}) ; 
		},1000)

	}

	shouldComponentUpdate( prop:appProps , state:appState ){

		let ret = false ; 
		(this.state.Loadershow != state.Loadershow)||
		(this.state.Modale != state.Modale)
		?ret=true:'';
		return ret ;

	}

	render(){

		const { Modale , modalComps , modalTitle , modalBtn , Loadershow } = this.state

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
						component={ (props) => <Dashboard closeLoader={ ()=> this.closeLoader() } />}
						/>
					<Route path="/recherche" 
						component={ (props) => <Recherche closeLoader={ ()=> this.closeLoader() } editePageRecherche={ ()=> this.editePageRecherche() } />} 
						/>
		        	<Route path="/affilier" 
		        		component={ (props) => <Affilier closeLoader={ ()=> this.closeLoader() } />}
		        		/>
					<Route 
		        		component={ (props) => <NoMatch closeLoader={ ()=> this.closeLoader() } />}
						/>
				</Switch>
				<Modals 
					title={ modalTitle }
					show={ Modale } 
					type={ modalComps }
					btn={ modalBtn }
					closeModal={ () => this.handleCloseModal() }
					></Modals>
				<Loader Show={Loadershow} ></Loader>

		</Container></Router>

	}

} 

reactDom.render(
	<Application/>,
	document.getElementById('app') as Element
)
