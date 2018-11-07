import React from 'react';
import { NavLink } from 'react-router-dom'
import './Navbar.css'

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
    var classNames = require('classnames');
    let classes = classNames('nav-item', {active: this.state.active});
    return (
        <nav id="navigation" class="navbar navbar-static-top navbar-expand-lg navbar-light bg-dark">
        <div class="container">
          <NavLink class="navbar-brand" to="/" id="title">
            Act & Care
          </NavLink>
          <div  class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item" >
                <NavLink  activeClassName = "nav-link active" className="nav-link"  to="/ajoutmissions">Ajouter des missions<span class="sr-only">(current)</span></NavLink>
              </li>
              <li class="nav-item" >
                <NavLink activeClassName = "nav-link active" className="nav-link" to="/recherchermissions">Rechercher des missions</NavLink>
              </li>

            </ul>
          </div>
          </div>
        </nav>
    );
  }
}
