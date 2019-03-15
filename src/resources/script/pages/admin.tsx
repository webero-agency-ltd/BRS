import * as React from 'react'
import reactDom from 'react-dom'
import Token from './components/Token/'
import Tagmanager from './components/Tagmanager/'
import Produit from './components/Produit/'
import Usermanager from './components/Usermanager/'

import Modals from './components/Modale/'
import { Container , Row , Col } from 'react-bootstrap';

import lang from '../libs/lang' ;

declare global {

    namespace JSX {
        interface IntrinsicElements {
            'Token': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'EditePageAffiliet': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'EditePageRecherche': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'Tagmanager': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'Produit': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'Usermanager': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
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

	/*
	*	Ouvrire modale edute affilet 
	*/
	EditePageAffiliet(){

		this.handleShowModal( 
			'EditePageAffiliet' , 
			lang('modale_title_page_affiliet',{ name }) 
		)

	}

	editePageRecherche(){

		this.handleShowModal(
			'EditePageRecherche' , 
			lang('tagmanager_page_recherche',{ name }),
			{ submit: 'Crée le tag' , cancel : 'suprimer le tag'})

	}

	/*
	*	Edition d'un prix d'un utilisateur en question
	*/

	EditePrice(){

		this.handleShowModal( 
			'EditePrice' , 
			lang('modale_title_page_affiliet',{ name }) 
		)

	}

	render(){


		const { Modale , modalComps , modalTitle , modalBtn } = this.state

		return <Container>

			<div className="tspace-1">
				<Token/>
			</div>

			<div className="tspace-1">
				<Tagmanager
					editePageAffiliet={ ()=> this.EditePageAffiliet() }
					editePageRecherche={ ()=> this.editePageRecherche() }
					></Tagmanager>
			</div>

			<div className="tspace-1">
				<Produit
					editePage={ ( name )=> this.handleShowModal( 'EditeProduit' , lang( 'modalProduitTitle' ,{ name }) ) }
					></Produit>
			</div>

			<div className="tspace-1">
				<Usermanager
					editePrice={ ()=> this.EditePrice() }
					></Usermanager>
			</div>	

			<Modals 
				title={ modalTitle }
				show={ Modale } 
				type={ modalComps }
				btn={ modalBtn }
				closeModal={ () => this.handleCloseModal() }
				></Modals>
		  	
		</Container>;

	}


}
 

reactDom.render(
	<Application/>,
	document.getElementById('app') as Element
)