import React from 'react';
import './Signin.css'

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      
      <div id="wrapper">
        <form id="login">
        <h2>Login or signup:</h2>
        <div id="firebaseui-auth-container"> </div>
        </form>
      </div>
      // <div id="firebaseui-auth-container"></div>
    
    );
  }
}
