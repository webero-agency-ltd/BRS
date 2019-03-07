import * as React from 'react'
import reactDom from 'react-dom'
import Token from './components/admin/Token/'
import SearchTag from './components/admin/SearchTag/'
import Produit from './components/admin/Produit/'

import Modals from './components/Modale/'
import { Container , Row , Col } from 'react-bootstrap';

import lang from '../libs/lang' ;

declare global {

    namespace JSX {
        interface IntrinsicElements {
            'Token': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'EditePage': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'EditePageRecherche': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'Produit': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }

    interface Window { 
    	trans: object;
    	isToken: boolean;
    	urlFindToken: string;
    }

}

interface appProps {

}

interface appState {

	Modale : boolean 

	modalComps : string 

	modalTitle : string

} 


class Application extends React.Component <appProps , appState>{

	constructor( props ){

		super( props )

		this.state = {

			Modale  : false , 
			modalComps  : '' , 
			modalTitle : '' ,

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

	handleShowModal( modalComps : string , modalTitle : string ){

		this.setState( { Modale: true , modalComps , modalTitle } ) ; 

	}

	render(){


		const { Modale , modalComps , modalTitle } = this.state

		return <Container>

			<div className="tspace-1" >
				<Token/>
			</div>

			<div className="tspace-1" >
				<SearchTag
					editePage={ ( name )=> this.handleShowModal( 'EditePage' , lang( 'modalEditPageTitle' ,{ name }) ) }
					editePageRecherche={ ( name )=> this.handleShowModal( 'EditePageRecherche' , lang( 'modalEditPageTitle' ,{ name }) ) }
					></SearchTag>
			</div>

			<div className="tspace-1" >
				<Produit
					editePage={ ( name )=> this.handleShowModal( 'EditeProduit' , lang( 'modalProduitTitle' ,{ name }) ) }
					></Produit>
			</div>

			<Modals 
				title={ modalTitle }
				show={ Modale } 
				type={ modalComps }
				closeModal={ () => this.handleCloseModal() }
				></Modals>
		  	
		</Container>;

	}


}
 

reactDom.render(
	<Application/>,
	document.getElementById('app') as Element
)