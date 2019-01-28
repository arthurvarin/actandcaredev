import React, { Component } from 'react';
import { Route} from 'react-router-dom'

//Pages admins
import AjoutMissions from './Components/AjoutMissions/AjoutMissions.js'
import RechercheMissions from './Components/RechercheMissions/RechercheMissions.js'
import Signin from './Components/Signin/Signin.js'
import Signup from './Components/Signup/Signup.js'
import Test from './Components/Test/Test.js'
import MissionPage from './Components/MissionPage/MissionPage.js'
import UserCreated from './Components/UserCreated/UserCreated.js';
import Logout from './Components/Logout/Logout.js'
import Admin from './Components/Admin/Admin.js'
import Account from './Components/Account/Acount.js'
import PrivateRoute from './Components/PrivateRoute.js'

//Pages médecins
import AccountMedecin from './Components/AccountMedecin/AcountMedecin.js'
import RechercheMissionsMedecin from './Components/RechercheMissionsMedecin/RechercheMissionsMedecin.js'
import MedecinRoute from './Components/MedecinRoute.js'

//Firebase
import Pdf from './Components/pdf/pdf.js'
import * as firebase from 'firebase'



class App extends Component {

  state = { loading: true, authenticated: false, user: null };

  componentDidMount() {
    firebase.auth().onAuthStateChanged( (user)=> {
      if (user) {
        return firebase.database().ref('/users/' + user.uid).once('value').then( (snapshot)=> {
          if(snapshot.val()!==undefined && snapshot.val()!==null){
            var statut = snapshot.val().statut;
            if(statut==="En attente")this.setState({authenticated: "attente"})
            // TEST THIS
            else if(statut==="valide")this.setState({authenticated: "valide"})
            //
            else if(statut==="admin")this.setState({authenticated: true})          
          }
          else{
            this.setState({authenticated:"complete_signup"})
          }
          this.setState({
            currentUser: user,
            loading: false
          });
        });
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
    const { authenticated, user, loading } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        {/* Pages admin */}
        <PrivateRoute path="/ajoutmissions" component={AjoutMissions} authenticated={authenticated}/>
        <PrivateRoute path="/recherchemissions" component={RechercheMissions} authenticated={authenticated} />
        <PrivateRoute path="/pdf" component={Pdf} authenticated={authenticated} />
        <PrivateRoute exact path="/" component={RechercheMissions} authenticated={authenticated}/>
        <PrivateRoute exact path="/inscriptions" component={Admin} authenticated={authenticated}/>
        <PrivateRoute path="/account" component={Account} authenticated={authenticated}/>
        <Route path="/login" component={Signin} />
        <Route path="/signup" component={Signup} user={user} />
        <Route path="/test" component={Test} />
        <Route path="/usercreated" component={UserCreated} />
        <Route path="/missionpage/:nomission" component={MissionPage} />
        <Route path="/logout" component={Logout} />
        {/* Pages médecins */}
        <MedecinRoute path="/rm_medecin" component={RechercheMissionsMedecin} authenticated={authenticated}/>
        <MedecinRoute path="/account_medecin" component={AccountMedecin} authenticated={authenticated}/>
      </div>
    );
  }
}

export default App;
