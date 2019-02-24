import React from 'react';
import listetypedetablissement from '../../Jasons/listetypedetablissement.json'
import listespecialite from '../../Jasons/listespecialite.json'
import listetype from '../../Jasons/listetype.json'
import listeregions1 from '../../Jasons/regions.json'
import listetyperemuneration from '../../Jasons/listetyperemuneration.json'
import * as firebase from 'firebase';
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import ReactNotify from 'react-notify';


export default class MissionPageMedecin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nomission: this.props.nomission,
      nomdusite: "",
      ville: "",
      ville_selected:"",
      region_selected:"",
      typedetablissement: "",
      typeremuneration: "",
      region: "",
      specialite: "",
      type: "",
      statut: "",
      datededebut: "",
      datedefin: "",
      heurededebut: "",
      heuredefin: "",
      remuneration: "",
      commentaires: "",
      listetypedetablissement: listetypedetablissement,
      listespecialite: listespecialite,
      listetype: listetype,
      listetyperemuneration: listetyperemuneration,
      ////Ville & région ////
      coderegion: 0,
      filteredVilles: [{ "nom": "Choisir une ville", "region": { "nom": "" } }],
      filteredRegions: listeregions1

    };
    this.GetValues(this.props.nomission);

    this.GetValues = this.GetValues.bind(this);

  }
  componentDidMount() {
    this.GetValues(this.state.nomission)
  }

  GetValues(nomission){
    const ref = firebase.database().ref('missions/' + nomission);
    ref.on('value', mission => {

      if(mission.val()!==null)
        this.setState({

          type: mission.val().type,
          typedetablissement: mission.val().typedetablissement,
          statut: mission.val().statut,
          specialite: mission.val().specialite,
          ville: mission.val().ville,
          region: mission.val().region,
          nomdusite: mission.val().nomdusite,
          heurededebut: mission.val().heurededebut,
          heuredefin: mission.val().heuredefin,
          datededebut: mission.val().datededebut,
          datedefin: mission.val().datedefin,
          remuneration: mission.val().remuneration,
          typeremuneration: mission.val().typeremuneration,
          commentaires: mission.val().commentaires,
          ville_selected: mission.val().ville,
          ville_nom: mission.val().ville,
          region_selected: mission.val().region

        })
      })
  }



  handleSubmit(e) {
    e.preventDefault();

    firebase.database().ref('missions/' + this.state.nomission).update({

      type: this.state.type,
      typedetablissement: this.state.typedetablissement,
      statut: this.state.statut,
      specialite: this.state.specialite,
      ville: this.state.ville_selected,
      region: this.state.region_selected,
      nomdusite: this.state.nomdusite,
      heurededebut: this.state.heurededebut,
      heuredefin: this.state.heuredefin,
      datededebut: this.state.datededebut,
      datedefin: this.state.datedefin,
      typeremuneration: this.state.typeremuneration,
      remuneration: this.state.remuneration,
      commentaires: this.state.commentaires

    })
    this.refs.notificator.success("Succès", "La mission à été mise à jour ", 4000);


  }

  render() {
    return (
        <div class="container" >
          <h1 > Mission {this.state.nomission}</h1>
          <form id="formbleu">

            <br />

            <div class="form-row">
              <div class="col-md-6">

              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="nomission"><b>Numéro de mission</b></label>
                  </div>
                  <div class="col-md-6">
                    <input disabled type="text" class="form-control" value={this.state.nomission}/>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="typedetablissement"><b>Nom du site</b></label>
                  </div>
                  <div class="col-md-6">
                    <input disabled type="text" class="form-control" value={this.state.nomdusite}/>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="typedetablissement"><b>Type d'établissement</b></label>
                  </div>
                  <div class="col-md-6">
                    <input disabled type="text" class="form-control" value={this.state.typedetablissement}/>
                  </div>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label><b>Ville</b></label>
                  <input disabled type="text" class="form-control" name="ville" value={this.state.ville_nom}></input>
                </div>
                <div class="form-group col-md-6 ">
                  <label><b>Région</b></label>
                  <input disabled type="text" class="form-control" value={this.state.region_selected}/>
                </div>
              </div>

              </div>
              <div class="col-md-6">

              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="type"><b>Type de mission</b></label>
                  </div>
                  <div class="col-md-6">
                    <input disabled type="text" class="form-control" value={this.state.type}/>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="specialite"><b>Spécialité</b></label>
                  </div>
                  <div class="col-md-6">
                    <input disabled type="text" class="form-control" value={this.state.specialite}/>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="datededebut"><b>Date de la mission</b></label>
                    <input disabled type="date" class="form-control" value={this.state.datededebut} onChange={this.handledatededebutChange} />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="heurededebut"><b>Heure de début</b></label>
                    <input disabled type="time" class="form-control" value={this.state.heurededebut} onChange={this.handleheurededebutChange} />
                  </div>
                  <div class="col-md-6">
                    <label for="heuredefin"><b>Heure de fin</b></label>
                    <input disabled type="time" class="form-control" value={this.state.heuredefin} onChange={this.handleheuredefinChange} />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-4">
                    <label for="remuneration"><b>Rémunération</b></label>
                  </div>
                  <div class="col-md-5">
                    <div class="input-group input-group-default mb-3">

                      <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-default">€</span>
                      </div>
                      <input disabled type="text" class="form-control" value={this.state.remuneration}/>
                    </div>
                  </div>
                  <div class="col-md-3">
                      <input disabled type="text" class="form-control" value={this.state.typeremuneration}/>
                  </div>
                </div>
              </div>



              </div>
            </div>

            <div class="form-group">
              <label for="commentaires"><b>Commentaires</b></label>
              <input disabled type="text" class="form-control" value={this.state.commentaires}/>
            </div>


            <br></br>
          </form>
          <ReactNotify ref='notificator'/>
        </div>
    );
  }
}
