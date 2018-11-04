import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';

const data = {
  labels: ['Attractions', 'Bâtiments', 'Personnel', 'Maintenance'],
  datasets: [
    {
      label: 'Nombre de visites',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56]
    }
  ]
};

export default class bar extends React.Component{

  render() {
    return (
      <div>
        <h2>Onglets les plus visitées</h2>
        <HorizontalBar data={data} />
      </div>
    );
  }
};
