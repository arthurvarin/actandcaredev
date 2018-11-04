import React from 'react';
import './Stats.css'
import BarExample from './bar';
import LineExample from './Line';
import data from '../../stats.json'
import HorizontalBarExample from './HorizontalBars';
import { SlideToggle } from 'react-slide-toggle';



export default class Stats extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          chartData: {},
          chartData2: {},
          statsvisiteurs: data,
          id:"",
          date:"",
          visite:" ",
          recette:" "
        };
        this.handledateChange = this.handledateChange.bind(this);
        this.handlevisiteChange = this.handlevisiteChange.bind(this);
        this.handlerecetteChange = this.handlerecetteChange.bind(this);

}

        handledateChange(event) {
          this.setState({date: event.target.value});
        }

        handlevisiteChange(event) {
          this.setState({visite: event.target.value});
        }
        handlerecetteChange(event) {
          this.setState({recette: event.target.value});
        }

handleSubmit(e) {
        e.preventDefault();
        let statsvisiteurs = this.state.statsvisiteurs;
        let newItem = {
          "id":this.state.id,
          "date":this.state.date,
          "visite":this.state.visite,
          "recette":this.state.recette
        };
        statsvisiteurs.push(newItem)
        this.setState({statsvisiteurs: statsvisiteurs});
        this.setState({id:"",date:"",visite:"",recette:""});
        this.setState({chartData: {}})
        this.getChartData();
        this.getChartData2();

    }

  componentWillMount(){
    this.getChartData();
    this.getChartData2();
  }


  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      500
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.getChartData();
    this.getChartData2();
  }

  getChartData(){

    let statsvisiteurs;
    let datetab = [];
    let visitetab = [];

    statsvisiteurs = this.state.statsvisiteurs.map(statsvisiteur => {
    visitetab.push(statsvisiteur.visite);
    datetab.push(statsvisiteur.date);
    })

    this.setState({
        chartData:{
          labels: datetab ,
          datasets: [
            {
              label: 'Nombre de visites',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data : visitetab
            }
          ]
        }
      })


  }

  getChartData2(){

    let statsvisiteurs;
    let datetab = [];
    let recettetab = [];

    statsvisiteurs = this.state.statsvisiteurs.map(statsvisiteur => {
    datetab.push(statsvisiteur.date);
    recettetab.push(statsvisiteur.recette);
    })

    this.setState({
          chartData2:{
            labels: datetab,
            datasets: [
              {
                label: 'Recette (en Euros)',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: recettetab
              }
            ],

          }
      })


  }

  render() {

    return (
          <div class="container">


             <div class="form-row">
               <div class="form-group col-md-6">
                  <LineExample chartData={this.state.chartData}/>
               </div>

               <div class="form-group col-md-6">
                  <BarExample chartData2={this.state.chartData2}/>
               </div>
            </div>


                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div class="form-row">
                      <div class="form-group col-md-12">
                      <label for="date">Date</label>
                      <input type="date" value={this.state.date} onChange={this.handledateChange} class="form-control" id="date"/>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="visite">Nombre de visites</label>
                        <input type="number" value={this.state.visite} onChange={this.handlevisiteChange} class="form-control" id="visite" placeholder=""/>
                      </div>

                      <div class="form-group col-md-6">
                        <label for="recette">Recette de la journée</label>
                        <div class="input-group input-group-default mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" id="inputGroup-sizing-default">€</span>
                            </div>
                              <input type="number" value={this.state.recette} onChange={this.handlerecetteChange} class="form-control" id="recette" placeholder="0"/>
                        </div>
                       </div>
                    </div>

                    <button type="submit" class="btn btn-md btn-block" id="addNewElement" > Ajouter </button>
               </form>

             </div>

    );

  }


}
