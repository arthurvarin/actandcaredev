import React from 'react';
import './Signin.css'
import * as firebase from 'firebase';

export default class Logout extends React.Component {

  componentDidMount() {
    firebase.auth().signOut().then(function() {
      alert("Signed out")
    }).catch(function(error) {
      alert("Error could not sign out")
    });
  }
  render(){
    return(<h1>User logged out</h1>)
  }
}
