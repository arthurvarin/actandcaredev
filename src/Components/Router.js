import React from 'react';
import { Route } from 'react-router-dom'
import AjoutMissions from './AjoutMissions/AjoutMissions.js'
import RechercheMissions from './RechercheMissions/RechercheMissions.js'
import MissionPage from './MissionPage/MissionPage.js'
import PageAccueil from './Accueil/PageAccueil.js'

export default class Router extends React.Component {
  render() {
    return (
        <div>
          <Route path="/ajoutmissions" component={AjoutMissions}/>
          <Route path="/recherchemissions" component={RechercheMissions}/>
          <Route path="/missionpage/:nomission" component={MissionPage}/>
          <Route path="/pageaccueil" component={PageAccueil}/>
        </div>
    );
  }
}
