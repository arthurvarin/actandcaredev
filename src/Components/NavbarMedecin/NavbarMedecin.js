import React from 'react';
import { NavLink } from 'react-router-dom'
import logo from '../../Icons/logo.png';

export default class NavbarMedecin extends React.Component {
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

/*<nav id="navigation" class="navbar navbar-expand-md navbar-fixed-top navbar-expand-lg navbar-light bg-light">
  <NavLink class="navbar-brand" to="/pageaccueil" > <img src={logo} id="logoaccueil" alt="logo" /> </NavLink>
  <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <div class="nav-item">
        <NavLink activeClassName = "nav-link active underbar" className="nav-link" to="/ajoutmissions"> Ajouter des missions <span class="sr-only">(current)</span></NavLink>
      </div>
      <div class="nav-item">
        <NavLink activeClassName = "nav-link active" className="nav-link"  to="/recherchemissions">Rechercher des missions</NavLink>
      </div>
      <div class="nav-item">
        <NavLink activeClassName = "nav-link active" className="nav-link"  to="/inscriptions">Admin</NavLink>
      </div>
    </div>
  </div>
  <div class="navbar-collapse collapse w-100 order-3 dual-collapse2" id="navbarNavAltMarkup">
    <div class="navbar-nav ml-auto">
      <div class="nav-item">
        <NavLink activeClassName = "nav-link active" className="nav-link"  to="/account">Mon compte</NavLink>
      </div>
      <div class="nav-item">
        <NavLink activeClassName = "nav-link active" className="nav-link"  to="/logout">Déconnexion</NavLink>
      </div>
  </div>
</nav>
*/

/*<nav id="navigation" class="navbar navbar-static-top navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <div  class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item" >
                <NavLink  activeClassName = "nav-link active" className="nav-link"  to="/pageaccueil"> <img src={logo} id="logoaccueil" alt="logo" /> </NavLink>
              </li>
              <li class="nav-item" >
                <NavLink  activeClassName = "nav-link active" className="nav-link"  to="/ajoutmissions"> Ajouter des missions<span class="sr-only">(current)</span></NavLink>
              </li>
              <li class="nav-item" >
                <NavLink activeClassName = "nav-link active" className="nav-link" to="/recherchemissions">Rechercher des missions</NavLink>
              </li>
              <li class="nav-item" >
                <NavLink activeClassName = "nav-link active" className="nav-link" to="/inscriptions">Gérer les inscriptions</NavLink>
              </li>
              <li class="nav-item" >
                <NavLink activeClassName = "nav-link active" className="nav-link" to="/account">Mon compte</NavLink>
              </li>""
              <li class="nav-item" >
                <NavLink activeClassName = "nav-link active" className="nav-link" to="/logout">Déconnexion</NavLink>
              </li>
            </ul>
          </div>
          </div>
 </nav>*/
