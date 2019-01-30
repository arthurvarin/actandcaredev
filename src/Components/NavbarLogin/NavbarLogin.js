import React from 'react';
import { NavLink } from 'react-router-dom'
import logo from '../../Icons/logo.png';

export default class NavbarLogin extends React.Component {
  render() {
    return (
      <nav id="navigation">
        <div class="container-navbar">
          <div class="li-logo">
            <NavLink  activeClassName="nav-link active" className="nav-link" to="/rm_medecin"><img src={logo} id="logoaccueil" alt="logo"/></NavLink>
          </div>
        </div>
      </nav>
    );
  }
}
