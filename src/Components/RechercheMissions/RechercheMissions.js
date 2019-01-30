import React, { Component } from 'react';
import './RMissions.css'
import * as firebase from 'firebase';
import {
  DropdownToggle,
  UncontrolledDropdown,
  Input,
} from 'reactstrap';
import moment from 'moment';
import Modal from 'react-responsive-modal';
import MissionPage from '../MissionPage/MissionPage.js'
import PdfFormDevis from '../PdfForm/PdfFormDevis.js'
import PdfFormODM from '../PdfForm/PdfFormODM.js'
import Navbar from '../Navbar/Navbar.js'
import MissionsSerie from '../MissionsSerie/MissionsSerie.js'
import listetypedetablissement from '../../Jasons/listetypedetablissement.json'
import listespecialite from '../../Jasons/listespecialite.json'
import listetype from '../../Jasons/listetype.json'
import listestatut from '../../Jasons/listestatut.json'
import listeregions1 from '../../Jasons/regions.json'
import filternameslist from '../../Jasons/filternameslist.json'
import filtervalueslist from '../../Jasons/filtervalueslist.json'
var dateFormat = require('dateformat');


export default class RechercheMissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMissions: [],
      filteredMissions: [],
      filteredMissionsextended: [],
      filternames: [],
      filtervalues: [],
      sortkeys: [],
      listetypedetablissement: listetypedetablissement,
      listespecialite: listespecialite,
      listetype: listetype,
      listestatut: listestatut,
      filternameslist: filternameslist,
      filtervalueslist: filtervalueslist,
      selectednomission:"",
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
      filtersdisplay: "",
      coderegion: 0,
      filteredVilles: [{ "nom": "Choisir une ville" }],
      filteredRegions: listeregions1,
      open: false,
      open2: false,
      open3: false,
      open4: false,
      checkedmissions: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateFiltersDisplay = this.updateFiltersDisplay.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.resetfilter = this.resetfilter.bind(this);
    this.onSort = this.onSort.bind(this)
    this.deleteFilter = this.deleteFilter.bind(this)
    this.handleChangeStatusTab = this.handleChangeStatusTab.bind(this)
    this.FiltersInit = this.FiltersInit.bind(this)
    this.deleteMission = this.deleteMission.bind(this)
    this.checkselected = this.checkselected.bind(this)

    //Gestion des villes
    this.displayVilles = this.displayVilles.bind(this)
    this.displayRegions = this.displayRegions.bind(this)
    this.handleChangeRegion = this.handleChangeRegion.bind(this)
    this.handleChangeVille = this.handleChangeVille.bind(this)
    this.filterVilles = this.filterVilles.bind(this)
    this.handleVilleSelection = this.handleVilleSelection.bind(this)
    this.extraireDateFrancais = this.extraireDateFrancais.bind(this)

  }

  onOpenModal = (nomission) => {
    this.setState({open: true, selectednomission: nomission });
  };

  onCloseModal = () => {
    this.setState({ open: false, selectednomission: ""  });
  };

  onOpenModal2 = () => {
    this.setState({open2: true});
  };

  onCloseModal2 = () => {
    this.setState({ open2: false });
  };

  onOpenModal3 = () => {
    this.setState({open3: true});
  };

  onCloseModal3 = () => {
    this.setState({ open3: false });
  };

  onOpenModal4 = (nomission) => {
    this.setState({open4: true, selectednomission: nomission  });
  };

  onCloseModal4 = () => {
    this.setState({ open4: false, selectednomission: ""   });
  };

  checkselected(event) {

      let tmpcheckedmissions = this.state.checkedmissions;
      let errorcount = 0;

      for (let i = 0; i < tmpcheckedmissions.length; i++) {
        if (event.target.name === tmpcheckedmissions[i]){
          tmpcheckedmissions[i]= "";
          errorcount++;
        }
      }

      if( errorcount === 0)
        tmpcheckedmissions.push(event.target.name);

      this.setState({ checkedmissions: tmpcheckedmissions})
  }


  deleteMission(todeletenomission) {


    if (todeletenomission.length> 12)
    {

      for (let i = 0; i < this.state.filteredMissionsextended.length; i++) {
        console.log(this.state.filteredMissionsextended.length)
          if(this.state.filteredMissionsextended[i].nomission.includes(todeletenomission.substring(0,11)))
            {
              console.log(" " + this.state.filteredMissionsextended[i].nomission + " " +todeletenomission.substring(0,11))

              firebase.database().ref('missions/' + this.state.filteredMissionsextended[i].nomission).remove()
            }
      }
    }else{
      firebase.database().ref('missions/' + todeletenomission).remove()
    }

  }

  FiltersInit(){

    let filternamestmp=[];
    let filtervaluestmp=[];

    this.state.filternameslist.forEach(name => {
      filternamestmp.push(name);
    })
    this.state.filtervalueslist.forEach(value => {
      filtervaluestmp.push(value);
    })

    this.setState({filternames: filternamestmp, filtervalues: filtervaluestmp})

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
    this.FiltersInit();
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
    let filteredmissionsextended = [];
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
          if (countmultiplesref === 0 )
            {
              if(child.val()['nomission'].length === 11 || (child.val()['nomission'].length === 13 && child.val()['nomission'].charAt(12)==='1' ))
              filteredmissions.push(child.val());

              filteredmissionsextended.push(child.val());
            }
          else if  (countmultiples === countmultiplesref )
            {
              if(child.val()['nomission'].length === 11 || (child.val()['nomission'].length === 13 && child.val()['nomission'].charAt(12)==='1' ))
              filteredmissions.push(child.val());

              filteredmissionsextended.push(child.val());
            }



      })
    })



    for (let i = 0; i < sortkeys.length; i++) {

      if (i === (sortkeys.length - 1))
        filteredmissions.sort((a, b) => a['datedefin'].localeCompare(b['datedefin']))

      if (sortkeys[i] === 'remuneration') {
        filteredmissions.sort((a, b) => parseInt(a[sortkeys[i]]) - parseInt(b[sortkeys[i]]))
      }
      else
        filteredmissions.sort((a, b) => a[sortkeys[i]].localeCompare(b[sortkeys[i]]))
    }
    if (sortkeys.length === 0) {
      filteredmissions.sort((a, b) => a['nomdusite'].localeCompare(b['nomdusite']))
      filteredmissions.sort((a, b) => a['datedefin'].localeCompare(b['datedefin']))
    }




    this.setState({ filteredMissions: filteredmissions, filteredMissionsextended: filteredmissionsextended  });

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

  extraireDateFrancais(date) {

    let jour = dateFormat(date, "dddd").toString();
    let mois = dateFormat(date, "mmmm").toString();
    let numero = dateFormat(date, "dd").toString();
    let annee = dateFormat(date, "yyyy").toString();

    if (jour === "Monday")
      jour = "Lundi";
    if (jour === "Tuesday")
      jour = "Mardi";
    if (jour === "Wednesday")
      jour = "Mercredi";
    if (jour === "Thursday")
      jour = "Jeudi";
    if (jour === "Friday")
      jour = "Vendredi";
    if (jour === "Saturday")
      jour = "Samedi";
    if (jour === "Sunday")
      jour = "Dimanche";

    if (mois === "January")
      mois = "Janvier";
    if (mois === "February")
      mois = "Février";
    if (mois === "March")
      mois = "Mars";
    if (mois === "April")
      mois = "Avril";
    if (mois === "May")
      mois = "Mai";
    if (mois === "June")
      mois = "Juin";
    if (mois === "July")
      mois = "Juillet";
    if (mois === "August")
      mois = "Aout";
    if (mois === "September")
      mois = "Septembre";
    if (mois === "October")
      mois = "Octobre";
    if (mois === "November")
      mois = "Novembre";
    if (mois === "December")
      mois = "Décembre";

    return jour + " " + numero + " " + mois + " " + annee;

  }

  handleChangeStatusTab(event) {
    firebase.database().ref('missions/' + event.target.name).update({ statut: event.target.value })
  }


  options_mission_listestatut_color(mission) {

    if (mission.statut === "Recherche en cours") return (<select type="text" class="form-control alert-danger" name={mission.nomission} value={mission.statut} onChange={this.handleChangeStatusTab} >
    {this.optionslistestatut()}
    </select>)
    else if (mission.statut === "Pourvu") return (<select type="text" class="form-control alert-success" name={mission.nomission} value={mission.statut} onChange={this.handleChangeStatusTab} >
    {this.optionslistestatut()}
    </select>)
    else return (<select type="text" class="form-control" name={mission.nomission} value={mission.statut} onChange={this.handleChangeStatusTab} >
    {this.optionslistestatut()}
    </select>)

  }

  deuxiemebouton(nomission){
    if( nomission.length > 12 ){
      return <button name={nomission} onClick={() => this.onOpenModal4(nomission)}>Afficher</button>
    }else{
      return <button name={nomission} onClick={() => this.onOpenModal(nomission)}>&#x270f; Modifier</button>
    }
  }

  addcheckbox(nomission){
    if( nomission.length > 12 ){
      return  ""
    }else{
      return <input type="checkbox" name={nomission} value="checked" onChange={this.checkselected}/>
    }
  }

  updateDisplay() {
    let listItem = this.state.filteredMissions.map((mission, index) =>

      <tr>
        <th>
          <button name={mission.nomission} onClick={() => this.onOpenModal(mission.nomission)}>&#x270f; </button>

        </th>
        <th caret size="sm">
          {/* <select type="text" class="form-control" name={mission.nomission} value={mission.statut} onChange={this.handleChangeStatusTab} >
          {this.optionslistestatut()}
        </select> */}
        {this.options_mission_listestatut_color(mission)}
        </th>
        <th caret size="sm">{mission.specialite}</th>
        <th caret size="sm">{this.extraireDateFrancais(mission.datededebut)}</th>
        <th caret size="sm">{mission.ville}</th>
        <th caret size="sm">{mission.type}</th>
        <th caret size="sm">{mission.typedetablissement}</th>
        <th caret size="sm">{mission.remuneration}</th>
        <th caret size="sm"><button onClick={() => this.deleteMission(mission.nomission)} class="deleteButton" > &#9003; </button></th>
      </tr>


    );
    this.setState({
      display: <div class="table-responsive"><table id="tablemission" size="sm">
        <tr>
          <th scope="col" class="titrecol"></th>
          <th scope="col"class="titrecol" ></th>
          <th scope="col" class="titrecol"><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'statut')} > Statut actuel de la mission </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" class="titrecol"><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'specialite')} > Spécialité </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" class="titrecol"><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'datedefin')} > Date </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" class="titrecol"><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'ville')} > Ville </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" class="titrecol" ><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'type')} > Type de mission </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" class="titrecol"><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'typedetablissement')}> Type d'E.S. </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" class="titrecol"><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'remuneration')} > Rémunération </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" class="titrecol"></th>

        </tr>
        {listItem}
      </table></div>
    });
  }

  resetfilter() {
    this.setState({
      filternames: [],
      filtervalues: [],
      filteredVilles: [],
      nomdusite: "",
      ville: "",
      region: "",
      region_selected: "",
      ville_selected: "",
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

    let tmpfilternames = [];
    let tmpfiltervalues = [];

    if (this.state.region_selected !== "" && this.state.region_selected !== "Veuillez selectionner une région" && this.state.region_selected !== undefined) {
      tmpfilternames.push("region");
      tmpfiltervalues.push(this.state.region_selected);
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

    if (this.state.ville_selected !== "" && this.state.ville_selected !== undefined) {
      tmpfilternames.push("ville");
      tmpfiltervalues.push(this.state.ville_selected);
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
    this.setState({ filternames: tmpfilternames });
    this.setState({ filtervalues: tmpfiltervalues });





  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //Gestion ville région
  displayVilles() {
    return this.state.filteredVilles.map((ville) =>
      <option>{ville.nom}</option>
    )
  }
  displayRegions() {
    return this.state.filteredRegions.map((region) =>
      <option code={region.code}>{region.nom}</option>
    )
  }
  handleChangeRegion(event) {
    var index = event.target.selectedIndex;
    var optionElement = event.target.childNodes[index]
    var region_code = optionElement.getAttribute('code');

    this.setState({ region_code, region_selected: event.target.value }, () => {
      this.loadCities()
    })
  }
  handleChangeVille(event) {
    this.setState({ ville_nom: event.target.value }, () => {
      this.loadCities_2(event)
    })
  }
  handleVilleSelection(event) {
    this.setState({
      region_selected: [this.state.filteredVilles[event.target.selectedIndex].region.nom],
      ville_selected: event.target.value
    })
  }
  loadCities() {
    fetch(`https://geo.api.gouv.fr/communes?codeRegion=${this.state.region_code}&fields=nom,codeRegion,region&format=json`)
      .then(result => result.json())
      .then(regionVilles =>{
        let ville_selected
        if (regionVilles[0] !== undefined) {
          ville_selected = regionVilles[0].nom
        }
        else{
          ville_selected =""
        }
         this.setState({ regionVilles: regionVilles, filteredVilles: regionVilles, ville_selected })
        });
  }
  loadCities_2(event) {
    fetch(`https://geo.api.gouv.fr/communes?nom=${this.state.ville_nom}&fields=nom,region&format=json`)
      .then(result => result.json())
      .then(villeVilles => {
        let region_selected
        let ville_selected
        if (villeVilles[0] !== undefined) {
          region_selected = villeVilles[0].region.nom
          ville_selected = villeVilles[0].nom
        }
        else {
          region_selected = ""
          ville_selected = ""
        }

        this.setState({ regionVilles: villeVilles, filteredVilles: villeVilles, region_selected, ville_selected })
      });
  }
  filterVilles(event) { // N'est pris en compte qu'avec la boucle choix région puis choix ville:
    let filteredVilles = this.state.regionVilles;
    filteredVilles = filteredVilles.filter(
      (city) => {
        return city["nom"].toUpperCase().indexOf(event.target.value.toUpperCase()) !== -1;
      }
    );
    //let  filteredRegions=[{ "nom": "....", "code":"" }]
    this.setState({ filteredVilles })
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  optionslistestatut() {
    return this.state.listestatut.map(listestatut => {
      if (listestatut === "Recherche en cours") {
        return (
          <option class="alert-danger">{listestatut}</option>
        )
      } else if (listestatut === "Pourvu") {
        return (
          <option class="alert-success">{listestatut}</option >
        )
      }
      else {
        return (
          <option>{listestatut}</option>
        )
      }
    })
  }
  optionslistestatut_color() {
    let optionslistestatut = this.optionslistestatut();
    if (this.state.statut === "Recherche en cours") return (<select type="text" class="form-control alert-danger" name="statut" value={this.state.statut} onChange={this.handleChange}  >
      {optionslistestatut}
    </select>)
    else if (this.state.statut === "Pourvu") return (<select type="text" class="form-control alert-success" name="statut" value={this.state.statut} onChange={this.handleChange}  >
      {optionslistestatut}
    </select>)
    else return (<select type="text" class="form-control" name="statut" value={this.state.statut} onChange={this.handleChange}  >
      {optionslistestatut}
    </select>)

  }

  render() {

    const { open } = this.state;
    const { open2 } = this.state;
    const { open3 } = this.state;
    const { open4 } = this.state;
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

    let optionslistestatut_color = this.optionslistestatut_color();

    return (

      <div>
        <header>
          <Navbar></Navbar>
        </header>
      <div class="row" id="whole_page">
      <Modal open={open} onClose={this.onCloseModal} center>
        <MissionPage nomission={this.state.selectednomission}/>
      </Modal>
      <Modal open={open2} onClose={this.onCloseModal2} center>
        <PdfFormDevis checkedmissions={this.state.checkedmissions}/>
      </Modal>
      <Modal open={open3} onClose={this.onCloseModal3} center>
        <PdfFormODM checkedmissions={this.state.checkedmissions}/>
      </Modal>
      <Modal open={open4} onClose={this.onCloseModal4} center>
        <MissionsSerie nomission={this.state.selectednomission}/>
      </Modal>
        <div class="col-md-3">

          <form id="choixcriteres" onSubmit={this.handleSubmit.bind(this)}>
            <div class="card">
            <header class="card-header">
              <h7 class="title"><b><u>Entrez vos critères de recherche</u></b></h7>
            </header>
            <div class="form-row">
              <button type="button" onClick={this.onOpenModal2} class="btn btn-md btn-block" id="devisodm" >Devis</button>
              <button type="button" onClick={this.onOpenModal3} class="btn btn-md btn-block" id="devisodm" >ODM</button>
            </div>
              <div class="filter-content">
                <div class="card-body">
                  <div class="form-row">
                      <div class="form-group col-md-6">
                        <label><b>Spécialité</b></label>
                        <select type="text" class="form-control" name="specialite" value={this.state.specialite} onChange={this.handleChange}  >
                          {optionslistespecialite}
                        </select>
                      </div>
                      <div class="form-group col-md-6">
                        <label><b>Statut</b></label>

                        {/*  <select type="text" class="form-control alert-danger" name="statut" value={this.state.statut} onChange={this.handleChange}  >
                          {optionslistestatut}
                        </select> */}

                        {optionslistestatut_color}
                      </div>
                    </div>
                  <label><b>Date</b></label>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label>Date de début</label>
                      <input type="date" class="form-control" name="datededebut" value={this.state.datededebut} onChange={this.handleChange} placeholder="aaaa-mm-jj"></input>
                    </div>
                    <div class="form-group col-md-6 ">
                      <label>Date de fin</label>
                      <input type="date" class="form-control" name="datedefin" value={this.state.datedefin} onChange={this.handleChange} placeholder="aaaa-mm-jj"></input>
                    </div>



                    {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                    {/* Gestion ville region */}
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label><b>Ville</b></label>
                        <Input name="ville" value={this.state.ville_nom} onChange={this.handleChangeVille}></Input>
                        <select type="text" class="form-control" name="ville" value={this.state.ville_selected} onChange={this.handleVilleSelection}>
                          {this.displayVilles()}
                        </select>
                      </div>
                      <div class="form-group col-md-6 ">
                        <label><b>Région</b></label>
                        <select type="text" class="form-control" name="region" value={this.state.region_selected} onChange={this.handleChangeRegion}  >
                          {this.displayRegions()}
                        </select>
                      </div>
                    </div>
                    {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                    {/* <div class="form-group col-md-6 ">
                      <label><b>Ville</b></label>
                      <Input type="text" name="ville" value={this.state.ville} onChange={this.handleChange} ></Input>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label><b>Région</b></label>
                        <select type="text" class="form-control" name="region" value={this.state.region} onChange={this.handleChange}  >
                          {this.displayRegions()}
                        </select>
                      </div>
                    </div> */}

                    {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


                  </div>
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
                      <label><b>Type d'E.S</b></label>
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
            <div>
              {this.state.filtersdisplay}
            </div>
          </form>



        </div>
          <div id="container" class="col-md-9">
          <div>

            {this.state.display}
          </div>

        </div>

      </div>
      </div>
    );

  }
}
