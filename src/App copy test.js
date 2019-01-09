import React, { Component } from 'react';
import Router from './Components/Router.js'
import Test from './Components/Test/Test.js'

class App extends Component {
  render() {
    return (
      <div>
        <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/3.5.1/firebase-ui-auth.css" />
            <h1>Ma bite</h1>
            <Test/>
      </div>
    );
  }
}

export default App;
