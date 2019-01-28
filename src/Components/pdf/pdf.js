import React, { Component }  from 'react';
import { PDFViewer} from '@react-pdf/renderer';
import MyDocument from './MyDocument.js';
import MyDocumentODM from './MyDocumentODM.js';
import Navbar from '../Navbar/Navbar.js';
import './pdf.css'

export default class MissionModal extends Component {
render (){

  if (this.props.location.state.typepdf==="ODM"){
  return (
      <div >
      <header><Navbar></Navbar>
    </header>
    <div id="blackbackground" >
    <br></br>
    <br></br>
    <PDFViewer width="100%" height="900">
      <MyDocumentODM missions={this.props.location.state.missions} date={this.props.location.state.date} nommedecin={this.props.location.state.nommedecin} specialite={this.props.location.state.specialite} adresseetablissement={this.props.location.state.adresseetablissement} nomcontact={this.props.location.state.nomcontact} telcontact={this.props.location.state.telcontact} emailcontact={this.props.location.state.emailcontact} nomdusite={this.props.location.state.nomdusite}/>
    </PDFViewer>
    </div>
    </div>
  );
  }
  else{
  return(
      <div >
      <header><Navbar></Navbar>
    </header>
    <div id="blackbackground" >
    <br></br>
    <br></br>
    <PDFViewer width="100%" height="900">
      <MyDocument missions={this.props.location.state.missions} date={this.props.location.state.date} nodevis={this.props.location.state.nodevis} refclient={this.props.location.state.refclient} nomdetablissement={this.props.location.state.nomdetablissement} nofiness={this.props.location.state.nofiness} contact={this.props.location.state.contact} email={this.props.location.state.email} adresse={this.props.location.state.adresse}/>
    </PDFViewer>
    </div>
    </div>
  );
  }


}

}
