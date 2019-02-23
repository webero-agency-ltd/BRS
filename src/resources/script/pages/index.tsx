import * as React from 'react'
import reactDom from 'react-dom'

import Modals from './components/Modale/'
import { Container , Row , Col } from 'react-bootstrap';

import lang from '../libs/lang' ;

declare global {

    namespace JSX {
        interface IntrinsicElements {
            //'Token': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }

    interface Window { 
    	trans: object;
    	isToken: boolean;
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
			sdsdfsdfsd
		</Container>;

	}


}
 

reactDom.render(
	<Application/>,
	document.getElementById('app') as Element
)