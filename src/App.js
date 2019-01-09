import React, { Component } from 'react';
import Navbar from './Components/Navbar/Navbar.js'
import Router from './Components/Router.js'

class App extends Component {
  render() {
    return (
      <div className="App">
      <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/3.5.1/firebase-ui-auth.css" />
        <header>
          <Navbar/>
        </header>
          <Router/>
      </div>
    );
  }
}

export default App;
