import React,{Component} from 'react';
import './Signin.css'
import * as firebaseui from 'firebaseui'
import * as firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import logo from '../../Icons/logo.png';

var uiConfig = {
  signInSuccessUrl: '/ajoutmissions',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,

  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: '/termsofservice',
  // Privacy policy url/callback.
  privacyPolicyUrl: function () {
    window.location.assign('/privacypolicy');
  }
};

export default class Signin extends Component {
  render() {
    return (

      <div id="wrapper">
        <form id="login">
        <img src={logo} id="logoaccueil" alt="logo"/>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </form>
      </div>
    );
  }
}
