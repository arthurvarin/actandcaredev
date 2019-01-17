import React from 'react';
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import logo from '../../Icons/logo.png';

export default class Navbar extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          attraction: false,
          batiments: false,
        };
    }
  toggleClass() {
        this.setState({ tab: true });
    };
  render() {
    // var classNames = require('classnames');
    // let classes = classNames('nav-item', {active: this.state.active});
    return (
        <nav id="navigation" class="navbar navbar-static-top navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <NavLink class="navbar-brand" to="/" id="title">
            Act & Care
          </NavLink>
          <div  class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item" >
              <NavLink  activeClassName = "nav-link active" className="nav-link"  to="/pageaccueil"> <img src={logo} id="logoaccueil" alt="logo" /> </NavLink>
            </li>
              <li class="nav-item" >
                <NavLink  activeClassName = "nav-link active" className="nav-link"  to="/ajoutmissions">Ajouter des missions<span class="sr-only">(current)</span></NavLink>
              </li>
              <li class="nav-item" >
                <NavLink activeClassName = "nav-link active" className="nav-link" to="/recherchemissions">Rechercher des missions</NavLink>
              </li>
            </ul>
          </div>
          </div>
        </nav>
    );
  }
}
