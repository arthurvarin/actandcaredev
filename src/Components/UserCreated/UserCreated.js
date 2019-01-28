import React from 'react';
import './Signin.css'
import {Redirect} from "react-router-dom";

export default class UserCreated extends React.Component {
 state={acceuil:false}
  handleClick(e){
    e.preventDefault()
    this.setState({acceuil:true})
  }
  render() {
    if(!this.state.acceuil) return (
      <div id="wrapper">
        <form id="login">
        <h2>Utilisateur créé! En attente de validation. Merci de contacter Act&Care concernant votre dossier</h2>
        <p></p>
        <button onClick={this.handleClick.bind(this)}>Accueil</button>
        </form>
      </div>
    );
    else return <Redirect to="/logout"></Redirect>
  }
}
