import React from 'react';
import './Signin.css'
import * as firebase from 'firebase';

export default class UserCreated extends React.Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
      } else {
        alert("Not logged in")
        document.location.href = '/login'
      }
    });
  }
  
  render() {
    return (
      <div id="wrapper">
        <form id="login">
        <h2>Utilisateur créé! En attente de validation. </h2>
        <p></p>
        </form>
      </div>
    );
  }
}
