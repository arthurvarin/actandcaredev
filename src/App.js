import React, { Component } from 'react';
import Router from './Components/Router.js'

class App extends Component {
  render() {
    return (
      <div className="App">
      <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/3.5.1/firebase-ui-auth.css" />
          <Router/>
      </div>
    );
  }
}

export default App;
