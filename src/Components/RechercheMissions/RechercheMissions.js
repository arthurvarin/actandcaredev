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
import listeregions from '../../Jasons/listeregions.json'


export default class RechercheMissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMissions: [],
      filteredMissions: [],
      sortkeys: [],
      listetypedetablissement: listetypedetablissement,
      listespecialite: listespecialite,
      listetype: listetype,
      listeregions: listeregions,
      display: "",
      nomdusite: "",
      ville: "",
      region: "",
      remunerationmin: "",
      remunerationmax: "",
      datededebut: "",
      datedefin: "",
      filtersnames: "",
      filtervalues: "",
      specialite: "",
      typedetablissement: "",
      type: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.resetfilter = this.resetfilter.bind(this);
    this.onSort = this.onSort.bind(this)

  }

  handleChange(event) {
     this.setState({ [event.target.name]: event.target.value });
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
    this.callFilters();
  }

  onSort(event, sortKey) {
    const sortkeys = this.state.sortkeys;

    sortkeys.push(sortKey);

    this.setState({ sortkeys: sortkeys})
  }

  resetListMissions(){
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


  callFilters(){

    let filteredmissions = [];
    let sortkeys = this.state.sortkeys;
    const ref = firebase.database().ref('missions');
    ref.on('value', snap => {
      snap.forEach(child => {

          let count = 0;

          for(let i=0; i < this.state.filtersnames.length; i++){
            console.log(this.state.filtersnames[i] + "" + this.state.filtersvalues[i]);

              if(this.state.filtersnames[i] !== "remunerationmin" && this.state.filtersnames[i] !== "remunerationmax" && this.state.filtersnames[i] !== "datededebut" && this.state.filtersnames[i] !== "datedefin")
                  if(child.val()[this.state.filtersnames[i]] !== this.state.filtersvalues[i])
                      count = count + 1;

              if(this.state.filtersnames[i] === "remunerationmin")
                  if(child.val()['remuneration'] < parseInt(this.state.filtersvalues[i]))
                      count = count + 1;

              if(this.state.filtersnames[i] === "remunerationmax")
                  if(child.val()['remuneration'] > parseInt(this.state.filtersvalues[i]))
                      count = count + 1;

              if(this.state.filtersnames[i] === "datededebut")
                  if( moment(child.val()['datededebut']).format("YYYY-MM-DD") < moment(this.state.filtersvalues[i]).format("YYYY-MM-DD"))
                      count = count + 1;

              if(this.state.filtersnames[i] === "datedefin")
                  if( moment(child.val()['datededebut']).format("YYYY-MM-DD") > moment(this.state.filtersvalues[i]).format("YYYY-MM-DD"))
                      count = count + 1;

         }
         if(count === 0)
             filteredmissions.push(child.val());

      })
    })



    for(let i=0; i<sortkeys.length; i++){

        if(i === (sortkeys.length - 1))
            filteredmissions.sort((a, b) => a['datedefin'].localeCompare(b['datedefin']))

        if(sortkeys[i] === 'remuneration'){
            console.log("remuneration")
            filteredmissions.sort((a, b) => parseInt(a[sortkeys[i]]) - parseInt(b[sortkeys[i]]))
        }

        filteredmissions.sort((a, b) => a[sortkeys[i]].localeCompare(b[sortkeys[i]]))
    }



    this.setState({filteredMissions: filteredmissions});
  }

  updateDisplay(){
      let listItem = this.state.filteredMissions.map((mission, index) =>
      <tr>
        <th>{mission.nomission}</th>
        <th>{mission.specialite}</th>
        <th>{mission.type}</th>
        <th>{mission.remuneration}</th>
        <th>{mission.nomdusite}</th>
        <th>{mission.typedetablissement}</th>
        <th>{mission.ville}</th>
        <th>{mission.region}</th>
        <th>{mission.datededebut}</th>
        <th>{mission.datedefin}</th>
        <th>{mission.statut} </th>
      </tr>
      );
      this.setState({display :<table class="table table-striped">
        <tr>
          <th scope="col" >N° de mission</th>
          <th scope="col" >Specialité</th>
          <th scope="col" >Type de mission</th>
          <th scope="col" >Rémunération</th>
          <th scope="col" >Nom du site</th>
          <th scope="col" >Type d'établissement</th>
          <th scope="col" >Ville</th>
          <th scope="col" >Région</th>
          <th scope="col" >Date de début</th>
          <th scope="col" >Date de fin</th>
          <th scope="col" >Statut</th>
        </tr>
        {listItem}
      </table>});
  }

  resetfilter(){
    this.setState({
      filtersnames: "",
      filtervalues: "",
      nomdusite: "",
      ville: "",
      region: "",
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

        let tmpfilternames = [];
        let tmpfiltervalues = [];

        if(this.state.region !== "" && this.state.region !== "Veuillez selectionner une région" && this.state.region !== undefined)
        {
            tmpfilternames.push("region");
            tmpfiltervalues.push(this.state.region);
        }

        if(this.state.specialite !== "" && this.state.specialite !== "Veuillez selectionner une spécialité" && this.state.specialite !== undefined)
        {
            tmpfilternames.push("specialite");
            tmpfiltervalues.push(this.state.specialite);
        }

        if(this.state.typedetablissement !== "" && this.state.typedetablissement !== "Veuillez selectionner un type d'établissement" && this.state.typedetablissement !== undefined)
        {
            tmpfilternames.push("typedetablissement");
            tmpfiltervalues.push(this.state.typedetablissement);
        }

        if(this.state.type !== "" && this.state.type !== "Veuillez selectionner un type de mission" && this.state.type !== undefined)
        {
            tmpfilternames.push("type");
            tmpfiltervalues.push(this.state.type);
        }

        if(this.state.ville !== "" && this.state.ville !== undefined)
        {
            tmpfilternames.push("ville");
            tmpfiltervalues.push(this.state.ville);
        }

        if(this.state.nomdusite !== "" && this.state.nomdusite !== undefined)
        {
            tmpfilternames.push("nomdusite");
            tmpfiltervalues.push(this.state.nomdusite);
        }

        if(this.state.remunerationmin !== "" && this.state.remunerationmin !== undefined)
        {
            tmpfilternames.push("remunerationmin");
            tmpfiltervalues.push(this.state.remunerationmin);
        }

        if(this.state.remunerationmax !== "" && this.state.remunerationmax !== undefined)
        {
            tmpfilternames.push("remunerationmax");
            tmpfiltervalues.push(this.state.remunerationmax);
        }

        if(this.state.datededebut !== "" && this.state.datededebut !== undefined)
        {
            tmpfilternames.push("datededebut");
            tmpfiltervalues.push(this.state.datededebut);
        }

        if(this.state.datedefin !== "" && this.state.datedefin !== undefined)
        {
            tmpfilternames.push("datedefin");
            tmpfiltervalues.push(this.state.datedefin);
        }

        this.setState({filtersnames: tmpfilternames});
        this.setState({filtersvalues: tmpfiltervalues});


}


  render() {


    let optionslistetypedetablissement;
    optionslistetypedetablissement = this.state.listetypedetablissement.map(listetypedetablissement => {
      return (
        <option >{listetypedetablissement}</option>
      )
    })
    let optionslisteregions;
    optionslisteregions = this.state.listeregions.map(listeregions => {
        return(
          <option >{listeregions}</option>
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

        <div class="col-md-3">
        <br></br>
        <br></br>

          <form  onSubmit={this.handleSubmit.bind(this)}>
          <br></br>
          <div class="card">
            <header class="card-header">
              <h6 class="title"><h4>Choisissez vos critères de recherche</h4></h6>
            </header>
            <div class="filter-content">
              <div class="card-body">
              <div class="form-group">
              <label><b>Nom du site</b></label>
              <Input type="text" name="nomdusite" value={this.state.nomdusite} onChange={this.handleChange} ></Input>
              </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label><b>Spécialité</b></label>
                  <select type="text" class="form-control" name="specialite" value={this.state.specialite} onChange={this.handleChange}  >
                    {optionslistespecialite}
                  </select>
                      </div>
                  <div class="form-group col-md-6 ">
                  <label><b>Type de mission</b></label>
                  <select type="text" class="form-control" name="type" value={this.state.type}  onChange={this.handleChange} >
                    {optionslistetype}
                  </select>
                      </div>
                </div>
                <div class="form-group">
                <label><b>Type d'établissement</b></label>
                <select type="text" class="form-control" name="typedetablissement" value={this.state.typedetablissement}  onChange={this.handleChange}>
                  {optionslistetypedetablissement}
                </select>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label><b>Ville</b></label>
                  <Input type="text" name="ville" value={this.state.ville} onChange={this.handleChange} ></Input>
                  </div>
                  <div class="form-group col-md-6 ">
                  <label><b>Région</b></label>
                  <select type="text" class="form-control" name="region" value={this.state.region} onChange={this.handleChange}  >
                    {optionslisteregions}
                    </select>

                      </div>
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
                </div>
              </div>
            </div>
            <div class="form-row">
            <button type="submit" class="btn btn-md btn-block" id="addNewElement" >Rechercher missions</button>
            <button type="button" class="btn btn-md btn-block" id="cancelbutton" onClick={this.resetfilter} >Réinitialiser</button>
            </div>
          </div>


          </form>



        </div>
        <div id="container" class="col-md-9">
          <br></br>
          <br></br>


          <div>
            <Navbar color="dark" light expand="md">
              <Nav className="ml-auto" navbar>
              <UncontrolledDropdown>
                <DropdownToggle onClick={e => this.onSort(e, 'specialite')} nav caret>
                  Spécialité
          </DropdownToggle>
              </UncontrolledDropdown>
              <UncontrolledDropdown>
                <DropdownToggle onClick={e => this.onSort(e, 'type')} nav caret>
                  Type de mission
          </DropdownToggle>
              </UncontrolledDropdown>
              <UncontrolledDropdown>
                <DropdownToggle onClick={e => this.onSort(e, 'typedetablissement')} nav caret>
                  Type d'établissement
          </DropdownToggle>
              </UncontrolledDropdown>
              <UncontrolledDropdown>
                <DropdownToggle onClick={e => this.onSort(e, 'remuneration')} nav caret>
                  Remunération
          </DropdownToggle>
              </UncontrolledDropdown>
              <UncontrolledDropdown>
                <DropdownToggle onClick={e => this.onSort(e, 'nomdusite')} nav caret>
                  Nom du site
          </DropdownToggle>
              </UncontrolledDropdown>
                <UncontrolledDropdown>
                  <DropdownToggle onClick={e => this.onSort(e, 'ville')} nav caret>
                    Ville
            </DropdownToggle>
                </UncontrolledDropdown>
                <UncontrolledDropdown>
                  <DropdownToggle onClick={e => this.onSort(e, 'region')} nav caret>
                    Région
            </DropdownToggle>
                </UncontrolledDropdown>
                <UncontrolledDropdown>
                  <DropdownToggle onClick={e => this.onSort(e, 'datedefin')} nav caret>
                    Date
            </DropdownToggle>
                </UncontrolledDropdown>
              </Nav>
            </Navbar>

            {this.state.display}
          </div>

          <br></br>



        </div>

        <div class="col-md-1"></div>
      </div>

    );

  }
}
