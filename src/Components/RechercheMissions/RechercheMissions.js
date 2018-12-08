import React, { Component } from 'react';
import './RMissions.css'
import * as firebase from 'firebase';
import {
  DropdownToggle,
  UncontrolledDropdown,
  Input,
} from 'reactstrap';
import moment from 'moment';

import listetypedetablissement from '../../Jasons/listetypedetablissement.json'
import listespecialite from '../../Jasons/listespecialite.json'
import listetype from '../../Jasons/listetype.json'
import listeregions from '../../Jasons/listeregions.json'
import listestatut from '../../Jasons/listestatut.json'


export default class RechercheMissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMissions: [],
      filteredMissions: [],
      filternames: [],
      filtervalues: [],
      sortkeys: [],
      listetypedetablissement: listetypedetablissement,
      listespecialite: listespecialite,
      listetype: listetype,
      listeregions: listeregions,
      listestatut: listestatut,
      display: "",
      nomdusite: "",
      ville: "",
      region: "",
      statut: "",
      tmpstatut: "",
      remunerationmin: "",
      remunerationmax: "",
      datededebut: "",
      datedefin: "",
      specialite: "",
      typedetablissement: "",
      type: "",
      filtersdisplay: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateFiltersDisplay = this.updateFiltersDisplay.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.resetfilter = this.resetfilter.bind(this);
    this.onSort = this.onSort.bind(this)
    this.deleteFilter = this.deleteFilter.bind(this)
    this.handleChangeStatusTab = this.handleChangeStatusTab.bind(this)



  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });

  }

  deleteFilter(i) {
    let newnames = this.state.filternames;
    newnames.splice(i, 1);
    let newvalues = this.state.filtervalues;
    newvalues.splice(i, 1);

    this.setState({ filternames: newnames, filtervalues: newvalues })
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      500
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.updateDisplay();
    this.updateFiltersDisplay();
    this.callFilters();
  }

  onSort(event, sortKey) {
    const sortkeys = this.state.sortkeys;

    sortkeys.push(sortKey);

    this.setState({ sortkeys: sortkeys })
  }

  resetListMissions() {
    const ref = firebase.database().ref('missions');
    ref.on('value', snap => {
      snap.forEach(child => {
        this.setState({
          listMissions: this.state.listMissions.concat(child.val()),
          filteredMissions: this.state.listMissions
        })

      })
    })
  }


  callFilters() {

    let filteredmissions = [];
    let sortkeys = this.state.sortkeys;
    const ref = firebase.database().ref('missions');
    ref.on('value', snap => {
      snap.forEach(child => {

        let count = 0;
        let countmultiples = 0;
        let countmultiplesref = 0;

        for (let i = 0; i < this.state.filternames.length; i++) {

          if (this.state.filternames[i] !== "remunerationmin" && this.state.filternames[i] !== "remunerationmax" && this.state.filternames[i] !== "datededebut" && this.state.filternames[i] !== "datedefin") {
            if (child.val()[this.state.filternames[i]] === this.state.filtervalues[i])
              countmultiples = countmultiples + 1;

            countmultiplesref = countmultiplesref + 1;

          }

          if (this.state.filternames[i] === "remunerationmin")
            if (child.val()['remuneration'] < parseInt(this.state.filtervalues[i]))
              count = count + 1;

          if (this.state.filternames[i] === "remunerationmax")
            if (child.val()['remuneration'] > parseInt(this.state.filtervalues[i]))
              count = count + 1;

          if (this.state.filternames[i] === "datededebut")
            if (moment(child.val()['datededebut']).format("YYYY-MM-DD") < moment(this.state.filtervalues[i]).format("YYYY-MM-DD"))
              count = count + 1;

          if (this.state.filternames[i] === "datedefin")
            if (moment(child.val()['datededebut']).format("YYYY-MM-DD") > moment(this.state.filtervalues[i]).format("YYYY-MM-DD"))
              count = count + 1;

        }
        if (count === 0)
          if (countmultiplesref === 0)
            filteredmissions.push(child.val());
          else if (countmultiples > 0)
            filteredmissions.push(child.val());



      })
    })



    for (let i = 0; i < sortkeys.length; i++) {

      if (i === (sortkeys.length - 1))
        filteredmissions.sort((a, b) => a['datedefin'].localeCompare(b['datedefin']))

      if (sortkeys[i] === 'remuneration') {
        filteredmissions.sort((a, b) => parseInt(a[sortkeys[i]]) - parseInt(b[sortkeys[i]]))
      }

      filteredmissions.sort((a, b) => a[sortkeys[i]].localeCompare(b[sortkeys[i]]))
    }
    if (sortkeys.length === 0) {
      filteredmissions.sort((a, b) => a['nomdusite'].localeCompare(b['nomdusite']))
      filteredmissions.sort((a, b) => a['datedefin'].localeCompare(b['datedefin']))
    }




    this.setState({ filteredMissions: filteredmissions });

  }

  updateFiltersDisplay() {

    let toreturn = [];
    let tmpname = "";

    for (let i = 0; i < this.state.filternames.length; i++) {

      if (this.state.filternames[i] === "region")
        tmpname = "Région";
      if (this.state.filternames[i] === "statut")
        tmpname = "Statut";
      if (this.state.filternames[i] === "ville")
        tmpname = "Ville";
      if (this.state.filternames[i] === "typedetablissement")
        tmpname = "Type d'établissement";
      if (this.state.filternames[i] === "specialite")
        tmpname = "Spécialité";
      if (this.state.filternames[i] === "type")
        tmpname = "Type de mission";
      if (this.state.filternames[i] === "nomdusite")
        tmpname = "Nom du site";

      if (this.state.filternames[i] === "nomdusite" || this.state.filternames[i] === "statut" || this.state.filternames[i] === "region" || this.state.filternames[i] === "ville" || this.state.filternames[i] === "typedetablissement" || this.state.filternames[i] === "specialite" || this.state.filternames[i] === "type")
        toreturn.push(
          <div class="alert alert-info alert-dismissible fade show" role="alert">
            {"" + tmpname + " : " + this.state.filtervalues[i]}
            <button type="button" onClick={() => this.deleteFilter(i)} class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>);
    }

    let filtersdisplay = toreturn;

    this.setState({ filtersdisplay: filtersdisplay });
  }


  handleChangeStatusTab(event) {

    firebase.database().ref('missions/' + event.target.name).update({ statut: event.target.value })

  }

  updateDisplay() {
    let listItem = this.state.filteredMissions.map((mission, index) =>
      <tr>
        <th>{mission.nomission}</th>
        <th><select type="text" class="form-control" name={mission.nomission} value={mission.statut} onChange={this.handleChangeStatusTab} >
          {this.state.listestatut.map(listestatut => { return (<option >{listestatut}</option>) })}
        </select></th>
        <th>{mission.specialite}</th>
        <th>{mission.datededebut}</th>
        <th>{mission.region}</th>
        <th>{mission.nomdusite}</th>
        <th>{mission.ville}</th>
        <th>{mission.typedetablissement}</th>
        <th>{mission.type}</th>
        <th>{mission.remuneration}</th>
      </tr>
    );
    this.setState({
      display: <div class="table-responsive"><table class="table table-striped">
        <tr>



          <th scope="col" ><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'nomission')} > N° de mission </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" ><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'statut')} > Statut actuel de la mission </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" ><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'specialite')} > Spécialité </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" ><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'datedefin')} > Date </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" ><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'region')} > Région </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" ><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'nomdusite')} > Nom du site </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" ><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'ville')} > Ville </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" ><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'typedetablissement')} > Type d'établissement </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" ><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'type')} > Type de mission </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" ><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'remuneration')} > Rémunération </DropdownToggle></UncontrolledDropdown></th>
        </tr>
        {listItem}
      </table></div>
    });
  }

  resetfilter() {
    this.setState({
      filternames: [],
      filtervalues: [],
      nomdusite: "",
      ville: "",
      region: "",
      statut: "",
      remunerationmin: "",
      remunerationmax: "",
      datededebut: "",
      datedefin: "",
      specialite: "",
      typedetablissement: "",
      type: "",
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    let tmpfilternames = this.state.filternames;
    let tmpfiltervalues = this.state.filtervalues;


    if (this.state.region !== "" && this.state.region !== "Veuillez selectionner une région" && this.state.region !== undefined) {
      tmpfilternames.push("region");
      tmpfiltervalues.push(this.state.region);
    }

    if (this.state.specialite !== "" && this.state.specialite !== "Veuillez selectionner une spécialité" && this.state.specialite !== undefined) {
      tmpfilternames.push("specialite");
      tmpfiltervalues.push(this.state.specialite);
    }

    if (this.state.statut !== "" && this.state.statut !== "Veuillez selectionner un type de statut de mission" && this.state.statut !== undefined) {
      tmpfilternames.push("statut");
      tmpfiltervalues.push(this.state.statut);
    }

    if (this.state.typedetablissement !== "" && this.state.typedetablissement !== "Veuillez selectionner un type d'établissement" && this.state.typedetablissement !== undefined) {
      tmpfilternames.push("typedetablissement");
      tmpfiltervalues.push(this.state.typedetablissement);
    }

    if (this.state.type !== "" && this.state.type !== "Veuillez selectionner un type de mission" && this.state.type !== undefined) {
      tmpfilternames.push("type");
      tmpfiltervalues.push(this.state.type);
    }

    if (this.state.ville !== "" && this.state.ville !== undefined) {
      tmpfilternames.push("ville");
      tmpfiltervalues.push(this.state.ville);
    }

    if (this.state.nomdusite !== "" && this.state.nomdusite !== undefined) {
      tmpfilternames.push("nomdusite");
      tmpfiltervalues.push(this.state.nomdusite);
    }

    if (this.state.remunerationmin !== "" && this.state.remunerationmin !== undefined) {
      tmpfilternames.push("remunerationmin");
      tmpfiltervalues.push(this.state.remunerationmin);
    }

    if (this.state.remunerationmax !== "" && this.state.remunerationmax !== undefined) {
      tmpfilternames.push("remunerationmax");
      tmpfiltervalues.push(this.state.remunerationmax);
    }

    if (this.state.datededebut !== "" && this.state.datededebut !== undefined) {
      tmpfilternames.push("datededebut");
      tmpfiltervalues.push(this.state.datededebut);
    }

    if (this.state.datedefin !== "" && this.state.datedefin !== undefined) {
      tmpfilternames.push("datedefin");
      tmpfiltervalues.push(this.state.datedefin);
    }
    console.log(tmpfilternames.length)
    this.setState({ filternames: tmpfilternames });
    this.setState({ filtervalues: tmpfiltervalues });


  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  listeville() {
    let optionslistevilles = this.state.listevilles.map((ville) =>
      <option >{ville.name}</option>
    )
    return optionslistevilles;
  }
  filtercities() {
    let cities = this.state.cities;
    cities = cities.filter(
      (city) => {
        return city.toUpperCase().indexOf(this.state.cityfilter.toUpperCase()) != -1;
      }
    )
    this.setState({ cities })
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render() {


    let optionslistetypedetablissement;
    optionslistetypedetablissement = this.state.listetypedetablissement.map(listetypedetablissement => {
      return (
        <option >{listetypedetablissement}</option>
      )
    })
    let optionslisteregions;
    optionslisteregions = this.state.listeregions.map(region => {
      return (
        <option >{region.name}</option>
      )

    })
    //let optionslistevilles = this.listeville();

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
    let optionslistestatut;
    optionslistestatut = this.state.listestatut.map(listestatut => {
      return (
        <option >{listestatut}</option >
      )
    })



    return (

      <div class="row" id="whole_page">

        <div class="col-md-3">
          <br></br>
          <br></br>

          <form onSubmit={this.handleSubmit.bind(this)}>
            <br></br>
            <div class="card">
              <header class="card-header">
                <h6 class="title"><h4>Choisissez vos critères de recherche</h4></h6>
              </header>
              <div class="filter-content">
                <div class="card-body">
                  <div class="form-group">
                    <label><b>Spécialité</b></label>
                    <select type="text" class="form-control" name="specialite" value={this.state.specialite} onChange={this.handleChange}  >
                      {optionslistespecialite}
                    </select>
                  </div>
                  <div class="form-group">
                    <label><b>Statut</b></label>
                    <select type="text" class="form-control" name="statut" value={this.state.statut} onChange={this.handleChange}  >
                      {optionslistestatut}
                    </select>
                  </div>
                  <label><b>Dates</b></label>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label>Date de début</label>
                      <input type="date" class="form-control" name="datededebut" value={this.state.datededebut} onChange={this.handleChange} placeholder="aaaa-mm-jj"></input>
                    </div>
                    <div class="form-group col-md-6 ">
                      <label>Date de fin</label>
                      <input type="date" class="form-control" name="datedefin" value={this.state.datedefin} onChange={this.handleChange} placeholder="aaaa-mm-jj"></input>
                    </div>


                    {/* <div class="form-row">
                      <div class="form-group col-md-6">
                        <label><b>Ville</b></label>

                        <Input name="ville" value={this.state.ville} onChange={this.handleChange}></Input>
                        <select type="text" class="form-control" name="ville" value={this.state.ville} onChange={this.handleChange}>
                          {optionslistevilles}
                        </select>
                      </div>
                    </div> */}

                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label><b>Région</b></label>
                          <select type="text" class="form-control" name="region" value={this.state.region} onChange={this.handleChange}  >
                            {optionslisteregions}
                          </select>
                        </div>
                      </div>

                        <div class="form-group col-md-6 ">
                          <label><b>Ville</b></label>
                          <Input type="text" name="ville" value={this.state.ville} onChange={this.handleChange} ></Input>
                        </div>
                      </div>
                      <br></br>
                      <div class="form-group">
                        <label><b>Nom du site</b></label>
                        <Input type="text" name="nomdusite" value={this.state.nomdusite} onChange={this.handleChange} ></Input>
                      </div>

                      <label><b>Rémunération</b></label>
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label>Min</label>
                          <input type="number" class="form-control" name="remunerationmin" value={this.state.remunerationmin} onChange={this.handleChange} placeholder="$0"></input>
                        </div>
                        <div class="form-group col-md-6 ">
                          <label>Max</label>
                          <input type="number" class="form-control" name="remunerationmax" value={this.state.remunerationmax} onChange={this.handleChange} placeholder="$0"></input>
                        </div>
                      </div>

                      <div class="form-row">
                        <div class="form-group col-md-6 ">
                          <label><b>Type de mission</b></label>
                          <select type="text" class="form-control" name="type" value={this.state.type} onChange={this.handleChange} >
                            {optionslistetype}
                          </select>
                        </div>
                        <div class="form-group col-md-6">
                          <label><b>Type d'établissement</b></label>
                          <select type="text" class="form-control" name="typedetablissement" value={this.state.typedetablissement} onChange={this.handleChange}>
                            {optionslistetypedetablissement}
                          </select>
                        </div>
                      </div>




                    </div>
                  </div>
                  <div class="form-row">
                    <button type="submit" class="btn btn-md btn-block" id="addNewElement" >Rechercher missions</button>
                    <button type="button" class="btn btn-md btn-block" id="cancelbutton" onClick={this.resetfilter} >Réinitialiser</button>
                  </div>
                </div>
                <br />
                <div>
                  {this.state.filtersdisplay}
                </div>
          </form>



            </div>
            <div id="container" class="col-md-9">
              <br></br>
              <br></br>


              <div>

                {this.state.display}
              </div>
              <br></br>

            </div>

            <div class="col-md-1"></div>
            </div>

          );
      
        }
      }
