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
<nav id="navigation" class="navbar navbar-fixed-top navbar-expand-lg navbar-light bg-light">
  <NavLink class="navbar-brand" to="/pageaccueil" > <img src={logo} id="logoaccueil" alt="logo" /> </NavLink>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <div class="nav-item">
        <NavLink activeClassName = "nav-link active" className="nav-link" to="/ajoutmissions"> Ajouter des missions <span class="sr-only">(current)</span></NavLink>
      </div>
      <div class="nav-item">
        <NavLink activeClassName = "nav-link active" className="nav-link"  to="/recherchemissions">Rechercher des missions</NavLink>
      </div>
  </div>
</div>
</nav>
    );
  }
}

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
            </ul>
          </div>
          </div>
 </nav>*/
