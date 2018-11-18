import React, {Component} from 'react';
import './AjoutMissions.css'
import * as firebase from 'firebase';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand,
  Collapse,
  DropdownToggle,
  UncontrolledDropdown,
  Button,
 } from 'reactstrap';


export default class AjoutMissions extends Component {
  constructor(props) {
        super(props);
        this.state = {
          listMissions:[]
        };
        this.onSort = this.onSort.bind(this)
      }

  componentDidMount(){
    const ref = firebase.database().ref('missions');
    //this.setState({nomission:3})
    ref.once('value', snap=>{
      snap.forEach(child=>{
        this.setState({
          listMissions:this.state.listMissions.concat(child.val())
      })
      })})
    }
 
  onSort(event, sortKey){
    const listMissions = this.state.listMissions;
    listMissions.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
    this.setState({listMissions})
  }

  displayMissions(){
    let listItem=this.state.listMissions.map((mission, index)=>
      <li key={index} class="form-group form-row .offset-md-3">
      <br></br>
      <div>
      <h3>Mission: {mission.nomission}</h3>
        <p>Date de début: {mission.datededebut}</p>
        <p>Date de fin: {mission.datedefin}</p>
        <p>Heure de fin: {mission.heuredefin}</p>
        <p>Région: {mission.region}</p>
        <p>Rémuneration: {mission.remuneration}</p>
        <p>Spécialite: {mission.specialite}</p>
        <p>Statut: {mission.statut}</p>
        <p>Type: {mission.type}</p>
        <p>Type d'établissement: {mission.typedetablissement}</p>
        <p>Ville: {mission.ville}</p>
      </div>
      </li> 
    );
    return(<ul>{listItem}</ul>)
  }

  // sortByName(a, b) {
  //   var nameA = a.ville.toUpperCase(); // ignore upper and lowercase
  //   var nameB = b.ville.toUpperCase(); // ignore upper and lowercase
  //   if (nameA < nameB) {
  //     return -1;
  //   }
  //   if (nameA > nameB) {
  //     return 1;
  //   }
  
  //   // names must be equal
  //   return 0;
  // }


  orderByRegion(){

  }
  orderByBegDate(){

  }
  orderByEndDate(){

  }

  render() {
    return(
      <div id="wrapper">

      <div class="container">
        <form>
        <br></br>


       <div>
        <Navbar color="dark" light expand="md">
            <Nav className="ml-auto" navbar>
            <UncontrolledDropdown>
            <DropdownToggle onClick={e => this.onSort(e, 'ville')} nav caret> 
                Nom de l'hopital
            </DropdownToggle>
            </UncontrolledDropdown>
            <UncontrolledDropdown>
            <DropdownToggle onClick={e => this.onSort(e, 'region')} nav caret> 
                 Région
            </DropdownToggle>
            </UncontrolledDropdown>
            <UncontrolledDropdown>
            <DropdownToggle onClick={e => this.onSort(e, 'datededebut')} nav caret> 
                 Date de fin
            </DropdownToggle>
            </UncontrolledDropdown>
            <UncontrolledDropdown>
            <DropdownToggle onClick={e => this.onSort(e, 'datedefin')} nav caret>
                 Date de début
            </DropdownToggle>
            </UncontrolledDropdown>
            </Nav>
         </Navbar>
      </div>
      
      
      <div class="form-group">
      <div class="form-row"> <div class="col-md-6">

      </div></div>
      </div>
      
      <div class="offset-md-4">{this.displayMissions()}</div>
      

      </form>
      

      </div>
      </div>
      
    );
   
  }
}
