import * as React from 'react'
import reactDom from 'react-dom'

import Modals from './components/Modale/'
import { Container , Row , Col } from 'react-bootstrap';

import Contacts from './components/Contacts/'
import Menu from './components/Menu/'
import lang from '../libs/lang' ;

declare global {

    namespace JSX { 
        interface IntrinsicElements {
            'Contacts': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'Menu': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
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

		const {} = this.state

		return <Container>

			<Menu/>

			<Contacts/>
			
		</Container>

	}


}
 

reactDom.render(
	<Application/>,
	document.getElementById('app') as Element
)