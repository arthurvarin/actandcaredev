import React,{Component} from 'react';
import './Signin.css'


export default class Signin extends Component {
  render() {
    return (
      
      <div id="wrapper">
      <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/3.5.1/firebase-ui-auth.css" />
        <form id="login">
        <h2>Login or signup:</h2>
        <div id="firebaseui-auth-container"></div>
        </form>
      </div>
      // <div id="firebaseui-auth-container"></div>
    
    );
  }
}
