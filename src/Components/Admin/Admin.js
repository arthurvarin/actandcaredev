import React, { Component } from 'react';
import './Admin.css'
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
      let newKeys = []
      snap.forEach(
        child => {
          newAccounts.push(child.val())
          newKeys.push(child.key)
        })
      this.setState({
        //listKeys: this.state.listKeys.concat(child.key),
        //listAccounts: this.state.listAccounts.concat(child.val()),
        listAccounts: newAccounts,
        listKeys: newKeys,
        loading: false
      })
    })
  }

  validateAccount(uid, index, e) {
    e.preventDefault();
    firebase.database().ref('users/' + uid).update(
      {
        statut: "Valide"
      })
  }
  rendreAdmin(uid, index, e) {
    e.preventDefault();
    firebase.database().ref('users/' + uid).update(
      {
        statut: "Admin"
      })
  }
  mettreEnAttente(uid, index,e){
    e.preventDefault();
    firebase.database().ref('users/' + uid).update(
      {
        statut: "En attente"
      })
  }

  display() {
    let i = -1;
    if (this.state.loading === true) return <div>Updating...</div>
    else if (this.state.listAccounts !== "") return this.state.listAccounts.map((account, index) => {
      i++;
      return (
        // <div id={index}>
        //   <tr>
        //     {/* <th scope="col">UID: {this.state.listKeys[i]}</th> */}
        //     <th scope="col">Email: {account.email}</th>
        //     <th scope="col">Nom: {account.name}</th>
        //     <th scope="col">RPPS: {account.RPPS}</th>
        //     <th scope="col">Date de naissance: {account.bdate}</th>
        //     <th scope="col">Rue: {account.rue}</th>
        //     <th scope="col">Specialité: {account.specialite}</th>
        //     <th scope="col">Téléphone: {account.tel}</th>
        //     <th scope="col">Région: {account.region}</th>
        //     <th scope="col">Ville: {account.ville}</th>
        //     <th scope="col" className="alert alert-danger">Statut: {account.statut}</th>
        //   </tr>
        //   <button onClick={this.validateAccount.bind(this, this.state.listKeys[i], index)}>Valider </button>
        //   <button onClick={this.rendreAdmin.bind(this, this.state.listKeys[i], index)}>Rendre admin</button>
        //   <br></br>
        //   <br></br>
        //   <br></br>
        // </div>

        <tr id={index}>
          {/* <th scope="col">UID: {this.state.listKeys[i]}</th> */}
          <td id="mailtd" ><b>{account.email}</b></td>
          <td><b>{account.name}</b></td>
          <td>{account.RPPS}</td>
          <td>{account.bdate}</td>
          <td>{account.rue}</td>
          <td><b>{account.specialite}</b></td>
          <td><b>{account.tel}</b></td>
          <td>{account.region}</td>
          <td>{account.ville}</td>
          <td><b>{account.statut}</b></td>
          <td id="modifiertd"><button type="button" class="btn btn-md btn-block" id="valider" onClick={this.validateAccount.bind(this, this.state.listKeys[i], index)}>Valider </button>
          <button type="button" class="btn btn-md btn-block" id="rendreadm" onClick={this.rendreAdmin.bind(this, this.state.listKeys[i], index)}>Rendre admin</button>
          <button type="button" class="btn btn-md btn-block" id="mettreatt"onClick={this.mettreEnAttente.bind(this, this.state.listKeys[i], index)}>En attente</button>
          </td>
        </tr>

      )

    })

  }


  render() {

    return (
      <div>
        <header>
          <Navbar></Navbar>
        </header>
        <div id="wrapperadmin">
          <form id="manage">
            <h2>Accounts Management</h2>

            <div id="container" className="col-md-12">
              <div class="table-responsive">
                <table id="tablemissionadmin">
                  <tr>
                    {/* <th scope="col">UID: {this.state.listKeys[i]}</th> */}
                    <th scope="col" class="coltitles" id="mailadm">Email</th>
                    <th scope="col" class="coltitles">Nom</th>
                    <th scope="col" class="coltitles">RPPS</th>
                    <th scope="col" class="coltitles">Date de naissance</th>
                    <th scope="col" class="coltitles">Rue</th>
                    <th scope="col" class="coltitles">Specialité</th>
                    <th scope="col" class="coltitles">Téléphone</th>
                    <th scope="col" class="coltitles">Région</th>
                    <th scope="col" class="coltitles">Ville</th>
                    <th scope="col" class="coltitles">Statut</th>
                    <th scope="col" class="coltitles" id="modifier">Modifier</th>
                  </tr>
                  {this.display()}
                </table>
              </div>
              <br></br>
            </div>
          </form>
        </div>
      </div>

    );
  }
}
