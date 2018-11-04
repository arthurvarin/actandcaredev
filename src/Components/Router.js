import React from 'react';
import { Route } from 'react-router-dom'
<<<<<<< HEAD
import AjoutMissions from './AjoutMissions/AjoutMissions.js'
=======
import Attraction from './Attraction/Attraction.js'
import Batiment from './Batiment/Batiment.js'
import Personnel from './Personnel/Personnel.js'
import Maintenance from './Maintenance/Maintenance.js'
import Stats from './Stats/Stats.js'
>>>>>>> 612e75c64879f5f5951fe0285c762456891efd30

export default class Router extends React.Component {
  render() {
    return (
        <div>
<<<<<<< HEAD
          <Route path="/ajoutmissions" component={AjoutMissions}/>
=======
          <Route path="/attractions" component={Attraction}/>
          <Route path="/batiments" component={Batiment}/>
          <Route path="/personnel" component={Personnel}/>
          <Route path="/stats" component={Stats}/>
          <Route path="/maintenance" component={Maintenance}/>
>>>>>>> 612e75c64879f5f5951fe0285c762456891efd30
        </div>
    );
  }
}
