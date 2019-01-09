import React from 'react';
import { Route } from 'react-router-dom'
import AjoutMissions from './AjoutMissions/AjoutMissions.js'
import RechercheMissions from './RechercheMissions/RechercheMissions.js'
import Signin from './Signin/Signin.js'
import Signup from './Signup/Signup.js'
import Test from './Test/Test.js'

export default class Router extends React.Component {
  render() {
    return (
        <div>
          <Route path="/ajoutmissions" component={AjoutMissions}/>
          <Route path="/recherchemissions" component={RechercheMissions}/>
          <Route path="/login" component={Signin}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/test" component={Test}/>
        </div>
    );
  }
}
