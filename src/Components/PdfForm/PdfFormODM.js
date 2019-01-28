import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom'
import { PDFViewer, Image, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import * as firebase from 'firebase';

var dateFormat = require('dateformat');

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  section1: {
    margin: 10,
    padding: 10,
    width: '100%',
    fontSize: 14,
    textAlign: 'center'
  },
  section2: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    width: '30%',
    fontSize: 14
  },
  sectionborder2: {
    marginLeft: 45,
    marginRight: 45,
    paddingTop: 7,
    flexGrow: 1,
    width: '20%',
    textAlign: 'left',
    borderWidth: 1,
    borderColor: 'black',
  },
  sectionborder2droite: {
    marginLeft: 15,
    paddingTop: 7,
    flexGrow: 1,
    width: '300px',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  section3: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    width: '30%',
    fontSize: 14,
    textAlign: 'left'
  },
  logostyle: {
    height: '30%',
    width: '60%'
  },
  date: {
    marginTop: '30px',
    textAlign: 'center'
  },
  double: {
    textAlign: 'center'
  },
  devis: {
    fontSize: 18,
    textAlign: 'center',
  },
  titre: {
    fontSize: 18,
    textAlign: 'center',
    padding: '10px',
    marginBottom: 5
  },
  titre2: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 7
  },
  list: {
    fontSize: 12,
    textAlign: 'left',
    marginLeft: '200px',
    marginTop: 7
  },
  inthebox: {
    fontSize: 10,
    textAlign: 'left',
    marginLeft: '10px',
    marginTop: 2
  },
  intheboxespace: {
    fontSize: 12,
    textAlign: 'left',
    marginLeft: '10px',
    margin: 15
  },
  intheboxsignature: {
    fontSize: 10,
    textAlign: 'left',
    marginLeft: '10px',
    marginBottom: 50,
    marginTop: 6
  },
  intheboxmention: {
    fontSize: 8,
    textAlign: 'left',
    marginLeft: '10px'
  },
  pageBackground: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    display: 'block',
    height: '100%',
    width: '100%',
  },
  borderleft: {
    fontSize: 8,
    padding: 9,
    marginLeft: 45,
    borderWidth: 1,
    height: '50px',
    borderColor: 'black',
    width: '11%'
    },
  border: {
    fontSize: 8,
    padding: 9,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
    alignContent: 'center',
    width: '10%'
    },
    border2: {
      fontSize: 8,
      padding: 9,
      borderWidth: 1,
      borderColor: 'black',
      textAlign: 'center',
      width: '16%'
      },
    border1: {
        fontSize: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: 'black',
        textAlign: 'center',
        width: '11%'
    },
    footer: {
      fontSize: 7,
      color: 'grey',
      textAlign: 'center'
    }
});

export default class PdfFormODM extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: "",
      nomdetablissement: "",
      nomcontact: "",
      nommedecin: "",
      emailcontact: "",
      telcontact: "",
      adresseetablissement: "",
      specialite: "",
      nomdusite: "",
      missions: [],
      listemissions: this.props.checkedmissions,
      redirect: false
    }
    this.extraireDateFrancais = this.extraireDateFrancais.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setmissions = this.setmissions.bind(this);
    this.sendsubmit = this.sendsubmit.bind(this);


  };

handleChange(event) {
  this.setState({ [event.target.name]: event.target.value });
}

setmissions(){

   let result=[];

   firebase.database().ref('missions').on('value', snap => {
     snap.forEach(child => {

       for (let i = 0; i < this.state.listemissions.length; i++) {



       if ( this.state.listemissions[i] === child.val()['nomission']){

          if (i===0){
              this.state.specialite = child.val()['specialite'];
              this.state.nomdusite = child.val()['nomdusite'];
          }

          let tmpmission = {nomission: child.val()['nomission'], datededebut: child.val()['datededebut'], type: child.val()['type'], heurededebut: child.val()['heurededebut'], heuredefin: child.val()['heuredefin'], remuneration: child.val()['remuneration']};
          result.push(tmpmission);
       }
       }
     })
  })

  this.state.missions = result;
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

sendsubmit(){
  this.setmissions();
  this.setState({redirect: true})
}


render (){
  if (this.state.redirect===true){
  return (
    <Redirect to={{
      pathname: '/pdf',
      state: { typepdf: "ODM", date: this.extraireDateFrancais(this.state.date), adresseetablissement: this.state.adresseetablissement, telcontact: this.state.telcontact, nomcontact: this.state.nomcontact, emailcontact: this.state.emailcontact, nommedecin: this.state.nommedecin, specialite: this.state.specialite, nomdusite: this.state.nomdusite, missions: this.state.missions}
    }}/>
  );
  }
  else{
  return(
    <div class="container" >
      <h1 > Remplissez ce formulaire pour générer l'ordre de mission </h1>
      <form  >
        <br></br>

          <div class="form-group">
            <div class="form-row">
              <div class="col-md-6">
                <label ><b>Nom du médecin</b></label>
              </div>
              <div class="col-md-6">
                <input type="text" class="form-control" name="nommedecin" value={this.state.nommedecin} onChange={this.handleChange} />
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="form-row">
              <div class="col-md-6">
                <label ><b>Adresse de l'établissement</b></label>
              </div>
              <div class="col-md-6">
                <input type="text" class="form-control" name="adresseetablissement" value={this.state.adresseetablissement} onChange={this.handleChange} />
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="form-row">
              <div class="col-md-6">
                <label ><b>Nom du contact</b></label>
              </div>
              <div class="col-md-6">
                <input type="text" class="form-control" name="nomcontact" value={this.state.nomcontact} onChange={this.handleChange} />
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="form-row">
              <div class="col-md-6">
                <label ><b>E-mail du contact</b></label>
              </div>
              <div class="col-md-6">
                <input type="text" class="form-control" name="emailcontact" value={this.state.emailcontact} onChange={this.handleChange} />
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="form-row">
              <div class="col-md-6">
                <label ><b>Téléphone du contact</b></label>
              </div>
              <div class="col-md-6">
                <input type="text" class="form-control" name="telcontact" value={this.state.telcontact} onChange={this.handleChange} />
              </div>
            </div>
          </div>


        <div class="form-row">
          <button onClick={this.sendsubmit} class="btn btn-md btn-block" id="addNewElement" >Générer un ordre de missions</button>
        </div>

      </form>
    </div>
    );
  }

}

}
