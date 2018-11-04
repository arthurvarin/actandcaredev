import React from 'react';
import {Bar} from 'react-chartjs-2';

export default class bar extends React.Component{
  constructor(props) {
        super(props);
        this.state = {
          chartData2:{}

        };

}

componentWillMount(){
  this.setState({chartData2: this.props.chartData2})
}

componentWillReceiveProps(){
  this.setState({chartData2: this.props.chartData2})
}

  render() {
    return (
      <div>
        <h2>Recettes par journée (en Euros)</h2>
        <Bar
          data={this.state.chartData2}
          options={{
            responsive: true,

				scales: {
					yAxes: [{
						ticks: {
							min: 0
						},
            scaleLabel: {
								display: true,
								labelString: 'Recettes (en Euros)'
							}
					}],
          xAxes: [{
            scaleLabel: {
								display: true,
								labelString: 'Dates'
							}
					}]
				}
          }}
        />
      </div>
    );
  }
};
