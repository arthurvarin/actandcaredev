import React, { Component } from 'react';
import './RMissions.css'
import * as firebase from 'firebase';
import {
  Navbar,
  Nav,
  DropdownToggle,
  UncontrolledDropdown,
  Input
} from 'reactstrap';

import listetypedetablissement from '../../Jasons/listetypedetablissement.json'
import listespecialite from '../../Jasons/listespecialite.json'
import listetype from '../../Jasons/listetype.json'


export default class RechercheMissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMissions: [],
      filteredMissions:[], 
      listetypedetablissement: listetypedetablissement,
      listespecialite: listespecialite,
      listetype: listetype,
    };
    this.onSort = this.onSort.bind(this)
    // this.handleChange = this.handleChange.bind(this)
    this.updateSearch = this.updateSearch.bind(this)
    this.filterMissions = this.filterMissions.bind(this)

  }

  componentDidMount() {
    const ref = firebase.database().ref('missions');
    //this.setState({nomission:3})
    ref.on('value', snap => {
      snap.forEach(child => {
        this.setState({
          listMissions: this.state.listMissions.concat(child.val()),
          filteredMissions:this.state.listMissions
        })
      })
    })
  }

  onSort(event, sortKey) {
    const listMissions = this.state.listMissions;
    listMissions.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
    this.setState({ listMissions })
  }

  // handleChange(event) {
  //   this.setState({ [event.target.name]: event.target.value });
  // }

  displayMissions() {
    let listItem = this.state.filteredMissions.map((mission, index) =>
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
    return (<ul>{listItem}</ul>)
  }

  filterMissions(event) {
    let filteredMissions = this.state.listMissions;

    filteredMissions = filteredMissions.filter(
      (mission) => {
        let param=event.target.name
        let mission1=mission[param];
        return mission1.toUpperCase().indexOf(event.target.value.toUpperCase()) !== -1;
        //return mission.ville.toUpperCase().indexOf(this.state.search.toUpperCase()) !== -1;
      }
    );
    this.setState({ filteredMissions})
  }
  filterMissionsDates(event){
    let filteredMissions = this.state.listMissions;

    filteredMissions = filteredMissions.filter(
      (mission) => {
        let param=event.target.name
        let mission1=mission[param];
        return mission1.toUpperCase().indexOf(event.target.value.toUpperCase()) !== -1;
        //return mission.ville.toUpperCase().indexOf(this.state.search.toUpperCase()) !== -1;
      }
    );
    this.setState({ filteredMissions})
  }
  updateSearch(event) {
    // this.setState({search: event.target.value.substr(0,20)});
    
    this.setState({ [event.target.name]: event.target.value });
    this.filterMissions(event)
  }




  render() {


    let optionslistetypedetablissement;
    optionslistetypedetablissement = this.state.listetypedetablissement.map(listetypedetablissement => {
      return (
        <option >{listetypedetablissement}</option>
      )
    })
    let optionslistespecialite;
    optionslistespecialite = this.state.listespecialite.map(listespecialite => {
      return (
        <option >{listespecialite}</option>
      )
    })
    let optionslistetype;
    optionslistetype = this.state.listetype.map(listetype => {
      return (
        <option >{listetype}</option >
      )
    })



    return (

      <div class="row" id="whole_page">

        <div class="offset-md-1 col-md-3">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br><br></br>
          <br></br>
          <br></br>

          <div class="card">
            <header class="card-header">
              <h6 class="title">Région</h6>
            </header>
            <div class="filter-content">
              <div class="card-body">
                <div class="form-row">

                  <Input type="test"></Input>

                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <header class="card-header">
              <h6 class="title">Nom de l'hopital = Ville</h6>
            </header>
            <div class="filter-content">
              <div class="card-body">
                <div class="form-row">

                  <Input type="text" name="ville" value={this.state.ville} onChange={this.updateSearch}></Input>

                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <header class="card-header">
              <h6 class="title">Date de début</h6>
            </header>
            <div class="filter-content">
              <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label>Min</label>
                    <input type="date" class="form-control" id="inputEmail4" placeholder="jj/mm/aaaa"></input>
                  </div>
                  <div class="form-group col-md-6 text-right">
                    <label>Max</label>
                    <input type="date" class="form-control" id="inputEmail4" placeholder="jj/mm/aaaa"></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <header class="card-header">
              <h6 class="title">Date de fin</h6>
            </header>
            <div class="filter-content">
              <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label>Min</label>
                    <input type="date" class="form-control" id="inputEmail4" placeholder="jj/mm/aaaa"></input>
                  </div>
                  <div class="form-group col-md-6 text-right">
                    <label>Max</label>
                    <input type="date" class="form-control" id="inputEmail4" placeholder="jj/mm/aaaa"></input>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <header class="card-header">
              <h6 class="title">Type d'établissement</h6>
            </header>
            <div class="filter-content">
              <div class="card-body">
                <div class="form-row">


                  <select type="text" class="form-control" name="typedetablissement" value={this.state.typedetablissement} onChange={this.updateSearch}  >
                    {optionslistetypedetablissement}

                  </select>

                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <header class="card-header">
              <h6 class="title">Rémuneration</h6>
            </header>
            <div class="filter-content">
              <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label>Min</label>
                    <input type="number" class="form-control" id="inputEmail4" placeholder="$0"></input>
                  </div>
                  <div class="form-group col-md-6 text-right">
                    <label>Max</label>
                    <input type="number" class="form-control" placeholder="$1,0000"></input>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="card">
            <header class="card-header">
              <h6 class="title">Spécialité</h6>
            </header>
            <div class="filter-content">
              <div class="card-body">
                <div class="form-row">
                  <select type="text" class="form-control" name="specialite" value={this.state.specialite} onChange={this.updateSearch}  >
                    {optionslistespecialite}

                    
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <header class="card-header">
              <h6 class="title">Type de mission</h6>
            </header>
            <div class="filter-content">
              <div class="card-body">
                <div class="form-row">
                  <select type="text" class="form-control" name="type" value={this.state.type} onChange={this.updateSearch}  >
                    {optionslistetype}
                  </select>
                </div>
              </div>
            </div>
          </div>




        </div>
        <div id="container" class="col-md-7">
          <br></br>
          <br></br>
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

          <br></br>
          <div class="offset-md-4">{this.displayMissions()}</div>


        </div>

        <div class="col-md-1"></div>
      </div>

    );

  }
}
