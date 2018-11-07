import React from 'react';
import { Route } from 'react-router-dom'
import AjoutMissions from './AjoutMissions/AjoutMissions.js'
export default class Router extends React.Component {
  render() {
    return (
        <div>
          <Route path="/ajoutmissions" component={AjoutMissions}/>
        </div>
    );
  }
}
