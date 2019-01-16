import React, {Component} from 'react';
import { Route} from 'react-router-dom'
import AjoutMissions from './AjoutMissions/AjoutMissions.js'
import RechercheMissions from './RechercheMissions/RechercheMissions.js'
import Signin from './Signin/Signin.js'
import Signup from './Signup/Signup.js'
import Test from './Test/Test.js'
import MissionPage from './MissionPage/MissionPage.js'
import UserCreated from './UserCreated/UserCreated.js';
import Logout from './Logout/Logout.js'
import PrivateRoute from './PrivateRoute.js'
import * as firebase from 'firebase'


export default class Router extends Component {
  state = { loading: true, authenticated: false, user: null };

  componentDidMount() {

    firebase.auth().onAuthStateChanged( (user)=> {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
        });
       /*  return firebase.database().ref('/users/' + user.uid).once('value').then(function (snapshot) {
          this.setState({
            authenticated: true,
            currentUser: user,
            loading: false
          });
        }); */
       
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
        });
      }
    });
  }

  render() {
    const { authenticated } = this.state;
    return (
      <div>
        <PrivateRoute path="/" component={RechercheMissions} authenticated={authenticated}/ >
        <PrivateRoute path="/ajoutmissions" component={AjoutMissions} authenticated={authenticated}/>
        <PrivateRoute path="/recherchemissions" component={RechercheMissions} authenticated={authenticated} />
        <Route path="/login" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/test" component={Test} />
        <Route path="/usercreated" component={UserCreated} />
        <Route path="/missionpage/:nomission" component={MissionPage} />
        <Route path="/Logout" component={Logout} />
      </div>
    );
  }
}
