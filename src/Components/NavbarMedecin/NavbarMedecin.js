import React from 'react';
import { NavLink } from 'react-router-dom'
import logo from '../../Icons/logo.png';

export default class NavbarMedecin extends React.Component {
  render() {
    return (
      <nav id="navigation">
        <div class="container-navbar">
          <div class="li-logo">
            <NavLink  activeClassName="nav-link active" className="nav-link" to="/rm_medecin"><img src={logo} id="logoaccueil" alt="logo"/></NavLink>
          </div>
          <div class="li-option">
            <NavLink activeClassName = "nav-link active option" className="nav-link"  to="/rm_medecin">Rechercher des missions</NavLink>
          </div>
          <div class="li-option-right">
            <NavLink activeClassName = "nav-link active option" className="nav-link"  to="/logout">Déconnexion</NavLink>
          </div>
          <div class="li-option-right">
            <NavLink activeClassName = "nav-link active option" className="nav-link"  to="/account_medecin">Mon compte</NavLink>
          </div>
        </div>
      </nav>
    );
  }
}