import React,{Component} from 'react';
import './Signin.css'
import '../../../node_modules/firebaseui/dist/firebaseui.css'

export default class Signin extends Component {
  render() {
    return (
      
      <div id="wrapper">
        <form id="login">
        <h2>Act & Care</h2>
        <div id="firebaseui-auth-container"></div>
        </form>
      </div>
    );
  }
}
