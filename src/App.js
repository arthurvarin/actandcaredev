import React, { Component } from 'react';
import logo from './logo.svg';
import Navbar from './Components/Navbar/Navbar.js'
import './App.css';
import Router from './Components/Router.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Navbar/>
        </header>
        <div id="wrapper">
            <Router/>
        </div>
      </div>
    );
  }
}

export default App;
