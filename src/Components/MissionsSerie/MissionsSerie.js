import React, { Component } from 'react';
import * as firebase from 'firebase';
import { DropdownToggle,  UncontrolledDropdown,} from 'reactstrap';
import Modal from 'react-responsive-modal';
import MissionPage from '../MissionPage/MissionPage.js'
import PdfFormDevis from '../PdfForm/PdfFormDevis.js'
import PdfFormODM from '../PdfForm/PdfFormODM.js'

import listestatut from '../../Jasons/listestatut.json'
var dateFormat = require('dateformat');


export default class MissionsSerie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open2: false,
      open3: false,
      checkedmissions: [],
      filteredmissions: [],
      display: "",
      datededebut: "",
      datedefin: "",
      listestatut: listestatut,
      selectednomission: ""

    };

    this.onSort = this.onSort.bind(this)
    this.checkselected = this.checkselected.bind(this)
    this.getMissions = this.getMissions.bind(this)

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

    this.getMissions();
    this.updateDisplay();
  }

  getMissions(){

    let nomissionbase = this.props.nomission.substring(0,11);

    let filteredmissions = [];
    let counter = 0;
    const ref = firebase.database().ref('missions');
    ref.on('value', snap => {
      snap.forEach(child => {

          if (child.val()['nomission'].includes(nomissionbase) && child.val()['nomission'].length === 13)
          {
            filteredmissions.push(child.val());

            if (counter === 0)
              {
                this.setState( { datededebut: child.val()['datededebut'], datedefin: child.val()['datedefin']})
              }

            counter++;
          }
      })
    });

    ref.on('value', snap => {
      snap.forEach(child => {

          if (child.val()['nomission'].includes(nomissionbase) && child.val()['nomission'].length === 14)
          {
            filteredmissions.push(child.val());
          }
      })
    });

    this.setState({ filteredmissions: filteredmissions})
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

  deuxiemebouton(nomission){
    if( nomission.length > 12 ){
      return <button name={nomission} onClick={() => this.onOpenModal4(nomission)}>Afficher</button>
    }else{
      return <button name={nomission} onClick={() => this.onOpenModal(nomission)}>&#x270f; Modifier</button>
    }
  }

  boutonsupprimer(nomission){
    if(nomission.length === 13 && nomission.charAt(12)==='1' ){
      return ""
    }else{
      return <button onClick={() => this.deleteMission(nomission)}>Supprimer</button>
    }
  }

  updateDisplay() {
    let listItem = this.state.filteredmissions.map((mission, index) =>

      <tr>
      <th>
      <input type="checkbox" name={mission.nomission} value="checked" onChange={this.checkselected}/>
      </th>
        <th>
          <button name={mission.nomission} onClick={() => this.onOpenModal(mission.nomission)}>&#x270f; Modifier</button>
        </th>
        <th>
        {this.options_mission_listestatut_color(mission)}
        </th>
        <th>{mission.specialite}</th>
        <th>{this.extraireDateFrancais(mission.datededebut)}</th>
        <th>{mission.ville}</th>
        <th>{mission.type}</th>
        <th>{mission.typedetablissement}</th>
        <th>{mission.remuneration}</th>
        <th>{this.boutonsupprimer(mission.nomission)}</th>
      </tr>


    );
    this.setState({
      display: <div class="table-responsive"><table id="tablemission" size="sm">
        <tr>
          <th scope="col" ></th>
          <th scope="col" ></th>
          <th scope="col" ><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'statut')} > Statut actuel de la mission </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" ><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'specialite')} > Spécialité </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" ><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'datedefin')} > Date </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" ><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'ville')} > Ville </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" ><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'type')} > Type de mission </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" ><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'typedetablissement')} > Type d'E.S. </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" ><UncontrolledDropdown><DropdownToggle onClick={e => this.onSort(e, 'remuneration')} > Rémunération </DropdownToggle></UncontrolledDropdown></th>
          <th scope="col" ></th>
        </tr>
        {listItem}
      </table></div>
    });
  }
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

  onSort(event, sortKey) {
    const sortkeys = this.state.sortkeys;

    sortkeys.push(sortKey);

    this.setState({ sortkeys: sortkeys })
  }

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
    firebase.database().ref('missions/' + todeletenomission).remove()
  }

  dateformatreduit(date){
    let mois = dateFormat(date, "mm").toString();
    let numero = dateFormat(date, "dd").toString();
    let annee = dateFormat(date, "yyyy").toString();



    return numero + "/" + mois + "/" + annee

  }


  render(){

    const { open } = this.state;
    const { open2 } = this.state;
    const { open3 } = this.state;
    return(
      <div >
      <Modal open={open} onClose={this.onCloseModal} center>
        <MissionPage nomission={this.state.selectednomission}/>
      </Modal>
      <Modal open={open2} onClose={this.onCloseModal2} center>
        <PdfFormDevis checkedmissions={this.state.checkedmissions}/>
      </Modal>
      <Modal open={open3} onClose={this.onCloseModal3} center>
        <PdfFormODM checkedmissions={this.state.checkedmissions}/>
      </Modal>
      <div style={{textAlign: 'center', width: '800px'}}>
        <h1>Mission du {this.dateformatreduit(this.state.datededebut)} au {this.dateformatreduit(this.state.datedefin)}</h1>
      </div>
      <div>
        <button onClick={this.onOpenModal2} class="btn btn-md btn-block" id="addNewElement" >Générer un devis</button>
        <button onClick={this.onOpenModal3} class="btn btn-md btn-block" id="addNewElement" >Générer un ODM</button>
      </div>
      <div>
      {this.state.display}
      </div>
      </div>
    )
  }

}
