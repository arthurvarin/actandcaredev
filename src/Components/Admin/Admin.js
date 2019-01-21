import React, { Component } from 'react';
import './Signin.css'
import Navbar from '../Navbar/Navbar.js'
import * as firebase from 'firebase'

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { listAccounts: [], listKeys: [], loading: true }
    this.display = this.display.bind(this)
  }

  componentDidMount() {
    this.fetch()
  }
  fetch() {
    const ref = firebase.database().ref('/users');
    ref.on('value', snap => {
      //https://css-tricks.com/intro-firebase-react/
      let newAccounts = [];
      let newKeys=[]
      snap.forEach(
        child => {
          newAccounts.push(child.val())
          newKeys.push(child.key)
        })
        this.setState({
          //listKeys: this.state.listKeys.concat(child.key),
          //listAccounts: this.state.listAccounts.concat(child.val()),
          listAccounts:newAccounts,
          listKeys:newKeys,
          loading: false
        })
    })
  }

  validateAccount(uid,index, e) {
    e.preventDefault();
    let listKeys=this.state.listKeys
    let listAccounts=this.state.listAccounts
    listKeys.splice(index,1)
    listAccounts.splice(index,1)
    firebase.database().ref('users/' + uid).update(
      {
        statut: "valide"
      })
  }
  rendreAdmin(uid,index, e) {
    e.preventDefault();
    let listKeys=this.state.listKeys
    let listAccounts=this.state.listAccounts
    listKeys.splice(index,1)
    listAccounts.splice(index,1)
    firebase.database().ref('users/' + uid).update(
      {
        statut: "admin"
      })
  }

  display() {
    let i = -1;
    if (this.state.loading === true) return <div>Updating...</div>
    else if (this.state.listAccounts !== "") return this.state.listAccounts.map((account, index) => {
      i++;
      return (
        <div id={index}>
          <tr>
            {/* <th scope="col">UID: {this.state.listKeys[i]}</th> */}
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
          <button onClick={this.validateAccount.bind(this, this.state.listKeys[i],index)}>Valider </button>
          <button onClick={this.rendreAdmin.bind(this, this.state.listKeys[i],index)}>Rendre admin</button>
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
