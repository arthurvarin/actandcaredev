import React,{Component} from 'react';
import './Signin.css'
import * as firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import logo from '../../Icons/logo.png';
import Navbar from '../NavbarLogin/NavbarLogin.js'
import {uiConfig} from '../../Firebase/uiConfig.js'

export default class Signin extends Component {
  render() {
    return (
      <div>
        <header>
          <Navbar></Navbar>
        </header>
        <div id="wrapper">
          <div id="login">
            <img src={logo} id="logologin" alt="logo"/>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
          </div>
        </div>
      </div>
    );
  }
}
