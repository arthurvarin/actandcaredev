import React, { Component } from 'react';
import Router from './Components/Router.js'
import { Route, Redirect} from 'react-router-dom'
import AjoutMissions from './Components/AjoutMissions/AjoutMissions.js'
import RechercheMissions from './Components/RechercheMissions/RechercheMissions.js'
import Signin from './Components/Signin/Signin.js'
import Signup from './Components/Signup/Signup.js'
import Test from './Components/Test/Test.js'
import MissionPage from './Components/MissionPage/MissionPage.js'
import UserCreated from './Components/UserCreated/UserCreated.js';
import Logout from './Components/Logout/Logout.js'
import PrivateRoute from './Components/PrivateRoute.js'
import * as firebase from 'firebase'


class App extends Component {

  state = { loading: true, authenticated: false, user: null };

  componentDidMount() {

    firebase.auth().onAuthStateChanged( (user)=> {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading:false,
        }, ()=>alert("LOGGEEED"));
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
          loading:false,
        });
      }
    });
  }
  render() {
    const { authenticated, loading } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
         <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/3.5.1/firebase-ui-auth.css" />
        <PrivateRoute exact path="/ajoutmissions" component={AjoutMissions} authenticated={authenticated}/>
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


/* 
  render(){
    return (
      <div className="App">
      <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/3.5.1/firebase-ui-auth.css" />
          <Router/>
      </div>
    );
  } */


}

export default App;
