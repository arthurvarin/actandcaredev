import React, { Component } from 'react';
import './Signin.css'
import Navbar from '../Navbar/Navbar.js'
import * as firebase from 'firebase'

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { listAccounts: [],listKeys:[], loading: true }
    this.display = this.display.bind(this)
  }

  componentDidMount() {
    this.fetch()
    // this.listAllUsers()
  }
  fetch() {
    //alert("init fetch")
    const ref = firebase.database().ref('/users');
    this.setState({
      listKeys: [],
      listAccounts: [],
      loading: true
    },()=>{ ref.on('value', snap => {
      //alert("fetching")
      snap.forEach(
        child => {
        this.setState({
          listKeys: this.state.listKeys.concat(child.key),
          listAccounts: this.state.listAccounts.concat(child.val()),
          loading: false
        })
      })
    })})

   
  }

  validateAccount(uid, e){
    e.preventDefault();
    firebase.database().ref('users/' + uid).set(
      {
        statut:"valide"
      },()=>{this.setState({listKeys:[], listAccounts:[]}, ()=>{alert("State set1")})})
  }
  rendreAdmin(uid, e){
    e.preventDefault();
    firebase.database().ref('users/' + uid).set(
      {
        statut:"admin"
      },()=>{this.setState({listKeys:[], listAccounts:[]}, ()=>{alert("State set2")})})
  }

  display() {
    let i=-1;
    if (this.state.loading === true) return <div>Updating...</div>
    else if (this.state.listAccounts !== "") return this.state.listAccounts.map((account, index) => {
      i++;
      return (
        <div id={index}>
        <tr>
          <th scope="col">Email: {this.state.listKeys[i]}</th>
          <th scope="col">Email: {account.email}</th>
          <th scope="col">Nom: {account.name}</th>
          <th scope="col">RPPS: {account.RPPS}</th>
          <th scope="col">Date de naissance: {account.bdate}</th> 
          <th scope="col">Rue: {account.rue}</th>
          <th scope="col">Specialité: {account.specialite}</th>
          <th scope="col">Téléphone: {account.tel}</th>
          <th scope="col">Région: {account.region}</th>
          <th scope="col">Ville: {account.ville}</th>
          <th scope="col" className="alert alert-danger">Statut: {account.statut}</th>
        </tr>
         <button onClick={this.validateAccount.bind(this, this.state.listKeys[i])}>Valider </button>
         <button onClick={this.rendreAdmin.bind(this, this.state.listKeys[i])}>Rendre admin</button>
         <br></br>
         <br></br>
         <br></br>
         </div>
        )
        
    })
  
  }


  render() {
    
    return (
      <div>
          <header>
            <Navbar></Navbar>
          </header>
        <div id="wrapper">
          <form id="login">
            <h2>Accounts Management</h2>

            <div id="container" className="col-md-9">
              <br></br>
              <br></br>
              <div>
                {this.display()}
              </div>
              <br></br>
            </div>
          </form>
        </div>
      </div>

    );
  }
}
