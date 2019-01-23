import React, { Component } from 'react';
import './Signin.css'
import * as firebase from 'firebase'

export default class Password extends Component {
  constructor(props) {
    super(props);
    this.state = { password: "", auth: false }
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  updatePassword(e) {
    e.preventDefault()
    this.props.user.updatePassword(this.state.password).then(() => {
      alert("Mot de passe mis à jour")
    }).catch(function (error) {
      alert(error.message)
      console.log(error)

    });
  }
  reauth(e) {
    e.preventDefault()

    // Prompt the user to re-provide their sign-in credentials
    let email=this.props.user.email
    let password=this.state.password
    var credentials = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    this.props.user.reauthenticateAndRetrieveDataWithCredential(credentials).then( ()=> {
      this.setState({auth:true, password:""})
    }).catch(function (error) {
      alert(error.message)
      console.log(error)
    });
  }

  render() {
    const { auth } = this.state
    if (auth) return (
      <div class="container" >
        <h1 > Changement de mot de passe </h1>
        <form onSubmit={this.updatePassword.bind(this)} >

          <br />

          <div class="form-row">
            <div class="col-md-6">

              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="typedetablissement"><b>Mot de passe: </b></label>
                  </div>
                  <div class="col-md-6">
                    <input type="password" inplace="Votre nouveau mot de passe" name="password" value={this.state.password} class="form-control" onChange={this.handleChange.bind(this)} />
                  </div>
                </div>
              </div>

            </div></div>

          <div class="form-row">
            <button type="submit" class="btn btn-md btn-block" id="addNewElement" >Modifier</button>
          </div>

        </form>


      </div>

    );
    if (!auth) return (
      <div class="container" >
        <h1 > Merci de vous réauthentifier </h1>
        <form onSubmit={this.reauth.bind(this)} >

          <br />

          <div class="form-row">
            <div class="col-md-6">

              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="typedetablissement"><b>Mot de passe: </b></label>
                  </div>
                  <div class="col-md-6">
                    <input type="password" name="password" value={this.state.password} class="form-control" onChange={this.handleChange.bind(this)} />
                  </div>
                </div>
              </div>

            </div></div>

          <div class="form-row">
            <button type="submit" class="btn btn-md btn-block" id="addNewElement" >Valider</button>
          </div>

        </form>


      </div>

    );
  }
}
