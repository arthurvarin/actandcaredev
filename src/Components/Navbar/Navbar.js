import React from 'react';
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import logo from '../../Icons/logo.png';


export default class Navbar extends React.Component {
  render() {
    return (
<<<<<<< HEAD
      <nav id="navigation">
        <div class="container-navbar">
          <div class="li-logo">
            <NavLink  activeClassName="nav-link active" className="nav-link" to="/"><img src={logo} id="logoaccueil" alt="logo"/></NavLink>
          </div>
          <div class="li-option">
            <NavLink activeClassName="nav-link active option" className="nav-link" to="/ajoutmissions">Ajouter des missions<span class="sr-only">(current)</span></NavLink>
          </div>
          <div class="li-option">
            <NavLink activeClassName = "nav-link active option" className="nav-link"  to="/recherchemissions">Rechercher des missions</NavLink>
          </div>
          <div class="li-option">
            <NavLink activeClassName = "nav-link active option" className="nav-link"  to="/inscriptions">Admin</NavLink>
          </div>
          <div class="li-option">
            <NavLink activeClassName = "nav-link active option" className="nav-link"  to="/rm_medecin">Mode médecin</NavLink>
          </div>
          <div class="li-option-right">
            <NavLink activeClassName = "nav-link active option" className="nav-link"  to="/logout">Déconnexion</NavLink>
          </div>
          <div class="li-option-right">
            <NavLink activeClassName = "nav-link active option" className="nav-link"  to="/account">Mon compte</NavLink>
=======
        <nav id="navigation">
          <div class="container-navbar">
            <div class="li-logo">
              <NavLink  activeClassName="nav-link active" className="nav-link" to="/"><img src={logo} id="logoaccueil" alt="logo"/></NavLink>
            </div>
            <div class="li-option">
              <NavLink activeClassName="nav-link active option" className="nav-link" to="/ajoutmissions">Ajouter des missions<span class="sr-only">(current)</span></NavLink>
            </div>
            <div class="li-option">
              <NavLink activeClassName = "nav-link active option" className="nav-link"  to="/recherchemissions">Rechercher des missions</NavLink>
            </div>
            <div class="li-option">
              <NavLink activeClassName = "nav-link active option" className="nav-link"  to="/inscriptions">Admin</NavLink>
            </div>
            <div class="li-option">
              <NavLink activeClassName = "nav-link active option" className="nav-link"  to="/rm_medecin">Mode médecin</NavLink>
            </div>
            <div class="li-option-right">
              <NavLink activeClassName = "nav-link active option" className="nav-link"  to="/logout">Déconnexion</NavLink>
            </div>
            <div class="li-option-right">
              <NavLink activeClassName = "nav-link active option" className="nav-link"  to="/accoun">Mon compte</NavLink>
            </div>
>>>>>>> cf883474ce6f94e44882b518a268fa9ebcaa7c82
          </div>
        </nav>
    );
  }
}
