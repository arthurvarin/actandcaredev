import React from 'react';
import {Redirect} from "react-router-dom";
import './Signin.css'
import * as firebase from 'firebase';

export default class Logout extends React.Component {
  state={logged:true}
  componentDidMount() {
    firebase.auth().signOut().then(()=> {
      this.setState({logged:false})
    }).catch(function(error) {
      alert("Error could not sign out")
    });
  }
  render(){
    if(!this.state.logged)return(<Redirect to="/login"/>)
    else return (<h1>Not logged in</h1>)
  }
}
