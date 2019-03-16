
import * as React from 'react'
import { Table , Row , Col } from 'react-bootstrap';

interface searchTagProps {
	Show : boolean
} 

interface searchTagState {
	 
} 

export default class Tableaux extends React.Component<searchTagProps,searchTagState>{

	constructor(props){

		super(props) ; 

		this.state = {

		}

	}


	componentDidMount(){

		console.log('-/**//////////////////////////////')

	}

	render(){

		const { Show } = this.props

		return <div>
			{ Show?<div className="loader-content">
				<div className="loader-text">
					Loading ...
				</div>
			</div>:<div></div> }
		</div>	
	}

}