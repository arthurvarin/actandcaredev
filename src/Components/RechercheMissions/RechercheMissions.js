import React, { Component } from 'react';
import './RMissions.css'
import * as firebase from 'firebase';
import {
  Navbar,
  Nav,
  DropdownToggle,
  UncontrolledDropdown,
  Input,
  Jumbotron,
  Button,
} from 'reactstrap';
import moment from 'moment';

import listetypedetablissement from '../../Jasons/listetypedetablissement.json'
import listespecialite from '../../Jasons/listespecialite.json'
import listetype from '../../Jasons/listetype.json'


export default class RechercheMissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMissions: [],
      filteredMissions: [],
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
          filteredMissions: this.state.listMissions
        })
      })
    })
  }

  onSort(event, sortKey) {
    const filteredMissions = this.state.filteredMissions;
    filteredMissions.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
    this.setState({ filteredMissions })
  }

  // handleChange(event) {
  //   this.setState({ [event.target.name]: event.target.value });
  // }

  displayMissions() {
    let listItem = this.state.filteredMissions.map((mission, index) =>
      <li key={index} class="list-unstyled">
        <br></br>
        <div>

          
          <Jumbotron className="">
            <h1 className="display-10">{mission.typedetablissement} de {mission.ville}</h1>
            <h2>Spécialite: {mission.specialite}</h2>
            <h3>Rémuneration: {mission.remuneration}</h3>
            <p className="lead">Date de début: {mission.datededebut}</p>
            <p className="lead">Date de fin: {mission.datedefin}</p>
            <p className="lead">Statut: {mission.statut}</p>
            <p className="lead">Type: {mission.type}</p>
            <hr className="my-2" />
            <p>Mission: {mission.nomission}</p>
            <p>Région: {mission.region}</p>
            <p className="lead">
              <Button color="primary">Plus de détails</Button>
            </p>
           
          </Jumbotron>
          {/* <h3>Mission: {mission.nomission}</h3>
          <p>Date de début: {mission.datededebut}</p>
          <p>Date de fin: {mission.datedefin}</p>
          <p>Heure de fin: {mission.heuredefin}</p>
          <p>Région: {mission.region}</p>
          <p>Rémuneration: {mission.remuneration}</p>
          <p>Spécialite: {mission.specialite}</p>
          <p>Statut: {mission.statut}</p>
          <p>Type: {mission.type}</p>
          <p>Type d'établissement: {mission.typedetablissement}</p>
          <p>Ville: {mission.ville}</p> */}
        </div>
      </li>
    );
    return (<ul>{listItem}</ul>)
  }

  filterMissions(event) {
    let filteredMissions = this.state.listMissions;

    filteredMissions = filteredMissions.filter(
      (mission) => {
        let param = event.target.name
        let mission1 = mission[param];
        return mission1.toUpperCase().indexOf(event.target.value.toUpperCase()) !== -1;
        //return mission.ville.toUpperCase().indexOf(this.state.search.toUpperCase()) !== -1;
      }
    );
    this.setState({ filteredMissions })
  }
  filterMissionsList(event) {
    let filteredMissions = this.state.listMissions;

    filteredMissions = filteredMissions.filter(
      (mission) => {
        let param = event.target.name
        let mission1 = mission[param];
        return mission1.toUpperCase() === event.target.value.toUpperCase();
        //return mission.ville.toUpperCase().indexOf(this.state.search.toUpperCase()) !== -1;
      }
    );
    this.setState({ filteredMissions })
  }
  filterMissionsDates(event) {
    let filteredMissions = this.state.listMissions;

    filteredMissions = filteredMissions.filter(
      (mission) => {
        if (event.target.name === 'datededebut1') return moment(mission.datededebut).format("YYYY-MM-DD") >= moment(event.target.value).format("YYYY-MM-DD");
        if (event.target.name === 'datededebut2') return moment(mission.datededebut).format("YYYY-MM-DD") <= moment(event.target.value).format("YYYY-MM-DD");
        if (event.target.name === 'datedefin1') return moment(mission.datedefin).format("YYYY-MM-DD") >= moment(event.target.value).format("YYYY-MM-DD");
        if (event.target.name === 'datedefin2') return moment(mission.datedefin).format("YYYY-MM-DD") <= moment(event.target.value).format("YYYY-MM-DD");
        else return 1;
      }
    );
    this.setState({ filteredMissions })
  }

  filterRem(event) {
    let filteredMissions = this.state.listMissions;

    filteredMissions = filteredMissions.filter(
      (mission) => {
        if (event.target.name === 'remunerationmin') return parseInt(mission.remuneration) >= parseInt(event.target.value);
        if (event.target.name === 'remunerationmax') return parseInt(mission.remuneration) <= parseInt(event.target.value);
        else return 1;
      }
    );
    this.setState({ filteredMissions })


  }


  updateSearch(event) {
    this.setState({ [event.target.name]: event.target.value });

    //Type of filtering Exact-list style / Search style / Date style
    if (event.target.name === 'ville' || event.target.name === 'region') this.filterMissions(event)
    else if (event.target.name === "datededebut1" || event.target.name === "datededebut2" || event.target.name === "datedefin1" || event.target.name === "datedefin2") this.filterMissionsDates(event)
    else if (event.target.name === "remunerationmin" || event.target.name === "remunerationmax") this.filterRem(event)
    else this.filterMissionsList(event)
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

                  <Input type="test" name="region" value={this.state.region} onChange={this.updateSearch}></Input>

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
                    <input type="date" class="form-control" name="datededebut1" value={this.state.datededebut1} onChange={this.updateSearch} placeholder="aaaa-mm-jj"></input>
                  </div>
                  <div class="form-group col-md-6 text-right">
                    <label>Max</label>
                    <input type="date" class="form-control" name="datededebut2" value={this.state.datededebut2} onChange={this.updateSearch} placeholder="aaaa-mm-jj"></input>
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
                    <input type="date" class="form-control" name="datedefin1" value={this.state.datedefin1} onChange={this.updateSearch} placeholder="aaaa-mm-jj"></input>
                  </div>
                  <div class="form-group col-md-6 text-right">
                    <label>Max</label>
                    <input type="date" class="form-control" name="datedefin2" value={this.state.datedefin2} onChange={this.updateSearch} placeholder="aaaa-mm-jj"></input>
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
                    <input type="number" class="form-control" name="remunerationmin" value={this.state.remunerationmin} onChange={this.updateSearch} placeholder="$0"></input>
                  </div>
                  <div class="form-group col-md-6 text-right">
                    <label>Max</label>
                    <input type="number" class="form-control" name="remunerationmax" value={this.state.remunerationmax} onChange={this.updateSearch} placeholder="$0"></input>
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
        <div id="container" class="col-md-6">
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

            {this.displayMissions()}
          </div>

          <br></br>
          


        </div>

        <div class="col-md-1"></div>
      </div>

    );

  }
}
