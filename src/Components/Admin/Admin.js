import React, { Component } from 'react';
import './Signin.css'
import * as firebase from 'firebase'


export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { listAccounts: [], loading: true }
    this.display = this.display.bind(this)
  }

  componentDidMount() {
    this.fetch()
  }

  fetch() {
    
    const ref = firebase.database().ref('/users');
    ref.on('value', snap => {
      snap.forEach(child => {
        this.setState({
          listAccounts: this.state.listAccounts.concat(child.val()),
          loading: false
        })
      })
    })
  }

  display() {
    if (this.state.listAccounts !== "") this.state.listAccounts.map((account, index) => {
      //alert(account.RPPS)
      return (
        <tr id={index}>
          <th>{alert(account.RPPS)}account.RPPS</th>
          <th>account.bdate</th>
          <th>account.region</th>
          <th>account.rue</th>
          <th>account.specialite</th>
          <th>account.statut</th>
          <th>account.tel</th>
          <th>account.ville</th>
        </tr>)
    })
  }

  render() {
    if (this.state.loading === true) return <div>Updating...</div>
    else return (

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
    );
  }
}
