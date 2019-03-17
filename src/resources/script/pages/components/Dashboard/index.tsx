import * as React from 'react'

import { Table , Row , Col } from 'react-bootstrap';

import { Chart, ChartData, Point } from "chart.js";

import contactsStore from '../../stores/contactsStore' ;


const plugin = {
    afterDraw: (chartInstance: Chart, easing: string, options?: any) => {
    }
};

interface props {

} 

interface state {

} 

export default class Tableaux extends React.Component<props,state>{

	private store : contactsStore = new contactsStore(1)

	constructor(props){

		super(props) ; 

		this.state = {
		
		}

	}

	componentDidMount(){
		
		const canvas = document.getElementById('myChart') as HTMLCanvasElement
		const ctx = canvas.getContext('2d');


		let options = {
		    responsive: true,
		    legend: {
			    display: false,
		    }
	    }

	    let data = {
		    labels: ["date 1", "date 2", "date 3", "date 4", "date 5"],
		    datasets: [
			    {
			        label: "TeamA Score",
			        data: [10, 50, 25, 70, 40],
			        backgroundColor: "blue",
			        borderColor: "lightblue",
			        fill: false,
			        lineTension: 0,
			        radius: 5
			    },
			    {
			        label: "TeamB Score",
			        data: [20, 35, 40, 60, 50],
			        backgroundColor: "green",
			        borderColor: "lightgreen",
			        fill: false,
			        lineTension: 0,
			        radius: 5
			    }
		    ]
		};

		const myChart = new Chart(ctx, {
		    type: 'line',
		    data ,
    		options  
		});
  
	}


	render(){

		return <Row>
			<Col>
				<canvas id="myChart" width="400" height="400"></canvas>
			</Col>
		</Row>
	}

}


