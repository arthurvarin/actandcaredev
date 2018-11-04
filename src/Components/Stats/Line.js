import React from 'react';
import {Line} from 'react-chartjs-2';

//const labelstab = ['Lundi 22 Octobre', 'Mardi 23 Octobre', 'Mercredi 24 Octobre', 'Jeudi 25 Octobre', 'Vendredi 26 Octobre', 'Samedi 27 Octobre', 'Dimanche 28 Octobre'];
//const datatab = [65, 59, 80, 81, 56, 55, 40];

export default class line extends React.Component{
  constructor(props) {
        super(props);
        this.state = {
          chartData: {}
          }
}

componentWillMount(){
  this.setState({chartData: this.props.chartData})
}

componentWillReceiveProps(){
  this.setState({chartData: this.props.chartData})
}

  render() {

    return (
      <div>
        <h2>Nombre de visiteurs</h2>
        <Line data={this.state.chartData} options={{
          responsive: true,

      scales: {
        yAxes: [{
          scaleLabel: {
              display: true,
              labelString: 'Visites'
            }
        }],
        xAxes: [{
          scaleLabel: {
              display: true,
              labelString: 'Dates'
            }
        }]
      }
        }}/>
      </div>
    );
  }
};
