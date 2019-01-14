import React from 'react';
import './Signin.css'
import * as firebase from 'firebase';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
  
  }
  componentDidMount() {

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.auth().signOut().then(function() {
        }).catch(function(error) {
          alert("Error could not sign out")
        });
       
      } else {
        alert("User not signed in")
      }
    });
  }
  render(){
    return(<h1>User logged out</h1>)
  }
}
