import * as React from 'react'

interface modaleProps {
	closeLoader : ( ) => void

}

interface modaleStade {

}

export default class Modale extends React.Component <modaleProps , modaleStade>{

	private child : React.RefObject<any>

	constructor( props ){

		super( props )

	}

	render(){

    	return <div>
		    <h3>No match for <code>{location.pathname}</code></h3>
		 </div>

	}

}