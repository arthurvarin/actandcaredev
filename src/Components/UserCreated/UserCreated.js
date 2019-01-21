import React from 'react';
import './Signin.css'
import {Redirect} from "react-router-dom";
import * as firebase from 'firebase';

export default class UserCreated extends React.Component {
 state={acceuil:false}
  componentDidMount() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
      } else {
        alert("Not logged in")
        document.location.href = '/login'
      }
    });
  }
  handleClick(e){
    e.preventDefault()
    this.setState({acceuil:true})
  }
  render() {
    if(!this.state.acceuil) return (
      <div id="wrapper">
        <form id="login">
        <h2>Utilisateur créé! En attente de validation. </h2>
        <p></p>
        <button onClick={this.handleClick.bind(this)}>Accueil</button>
        </form>
      </div>
    );
    else return <Redirect to="/logout"></Redirect>
  }
}
