import * as React from 'react'
import { Row , Col , ListGroup , Badge } from 'react-bootstrap';

import lang from '../../../libs/lang' ;

interface searchTagProps {

	editePageAffiliet : ( ) => void
	editePageRecherche : ( ) => void

} 

interface searchTagStade {
	
} 

export default class SearchTag extends React.Component<searchTagProps,searchTagStade>{

	constructor(props){

		super(props) ; 

	}

	render(){

		let { editePageAffiliet , editePageRecherche } = this.props ; 

		return <Row>
					<Col>
			    		<ListGroup>
						  	<ListGroup.Item variant="dark" >{lang('tagmanager_title')}</ListGroup.Item>
						  	<ListGroup.Item>{lang('tagmanager_page_recherche')} <Badge className="on-hover btn-left" onClick={ ()=> editePageRecherche() } pill variant="info">{lang('edit')} </Badge></ListGroup.Item>
						  	<ListGroup.Item>{lang('tagmanager_page_affiliet')} <Badge className="on-hover btn-left" onClick={ ()=> editePageAffiliet() } pill variant="info">{lang('edit')} </Badge></ListGroup.Item>
						</ListGroup>
			    	</Col>
		  		</Row>
	}


}