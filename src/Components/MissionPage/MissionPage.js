import React from 'react';
import listetypedetablissement from '../../Jasons/listetypedetablissement.json'
import listespecialite from '../../Jasons/listespecialite.json'
import listetype from '../../Jasons/listetype.json'
import listeregions1 from '../../Jasons/regions.json'
import listetyperemuneration from '../../Jasons/listetyperemuneration.json'
import * as firebase from 'firebase';
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import ReactNotify from 'react-notify';


export default class MissionPage extends React.Component {
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
    this.handlenomdusiteChange = this.handlenomdusiteChange.bind(this);
    this.handlevilleChange = this.handlevilleChange.bind(this);
    this.handletypedetablissementChange = this.handletypedetablissementChange.bind(this);
    this.handleregionChange = this.handleregionChange.bind(this);
    this.handlespecialiteChange = this.handlespecialiteChange.bind(this);
    this.handletypeChange = this.handletypeChange.bind(this);
    this.handletyperemunerationChange = this.handletyperemunerationChange.bind(this);
    this.handledatededebutChange = this.handledatededebutChange.bind(this);
    this.handledatedefinChange = this.handledatedefinChange.bind(this);
    this.handleheurededebutChange = this.handleheurededebutChange.bind(this);
    this.handleheuredefinChange = this.handleheuredefinChange.bind(this);
    this.handleremunerationChange = this.handleremunerationChange.bind(this);
    this.handlecommentairesChange = this.handlecommentairesChange.bind(this);
    this.GetValues = this.GetValues.bind(this);


    //// Ville & région

    this.displayVilles = this.displayVilles.bind(this)
    this.displayRegions = this.displayRegions.bind(this)
    this.handleChangeRegion = this.handleChangeRegion.bind(this)
    this.handleChangeVille = this.handleChangeVille.bind(this)
    this.filterVilles = this.filterVilles.bind(this)
    this.handleVilleSelection = this.handleVilleSelection.bind(this)
  }


  handletyperemunerationChange(event) {
    this.setState({ typeremuneration: event.target.value });
  }
  handlevilleChange(event) {
    this.setState({ ville: event.target.value });
  }
  handlenomdusiteChange(event) {
    this.setState({ nomdusite: event.target.value, nomdusitemanual: true });
  }
  handletypedetablissementChange(event) {
    this.setState({ typedetablissement: event.target.value });
  }
  handleregionChange(event) {
    this.setState({ region: event.target.value });
  }
  handlespecialiteChange(event) {
    this.setState({ specialite: event.target.value });
  }
  handletypeChange(event) {
    this.setState({ type: event.target.value });
  }
  handledatededebutChange(event) {
    this.setState({ datededebut: event.target.value });
  }
  handledatedefinChange(event) {
    this.setState({ datedefin: event.target.value });
  }
  handleheurededebutChange(event) {
    this.setState({ heurededebut: event.target.value });
  }
  handleheuredefinChange(event) {
    this.setState({ heuredefin: event.target.value });
  }
  handleremunerationChange(event) {
    this.setState({ remuneration: event.target.value });
  }
  handlecommentairesChange(event) {
    this.setState({ commentaires: event.target.value });
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

  handleChangeStatus(event) {


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


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Ville & région
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
    //if(event.target.value="")this.setState({   filteredVilles: [{ "nom": "Choisir une ville", "region":{"nom":""}}],})
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
      .then(regionVilles => this.setState({ regionVilles: regionVilles, filteredVilles: regionVilles }));
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
        else{
          region_selected=""
          ville_selected =""
        }

        this.setState({ regionVilles: villeVilles, filteredVilles: villeVilles, region_selected, ville_selected })
      });
  }

  // N'est pris en compte qu'avec la boucle choix région puis choix ville:
  filterVilles(event) {
    let filteredVilles = this.state.regionVilles;
    filteredVilles = filteredVilles.filter(
      (city) => {
        return city["nom"].toUpperCase().indexOf(event.target.value.toUpperCase()) !== -1;
      }
    );
    //let  filteredRegions=[{ "nom": "....", "code":"" }]
    this.setState({ filteredVilles })
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

    let optionslistetypedremuneration;
    optionslistetypedremuneration = this.state.listetyperemuneration.map(listetyperemuneration => {
      return (
        <option >{listetyperemuneration}</option >
      )

    })



    return (
        <div class="container" >
          <h1 > Mission {this.state.nomission}</h1>
          <form id="formbleu" onSubmit={this.handleSubmit.bind(this)} >

            <br />

            <div class="form-row">
              <div class="col-md-6">

              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="nomission"><b>Numéro de mission</b></label>
                  </div>
                  <div class="col-md-6">
                    <input disabled type="text" class="form-control" value={this.state.nomission}   />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="typedetablissement"><b>Nom du site</b></label>
                  </div>
                  <div class="col-md-6">
                    <input type="text" class="form-control" value={this.state.nomdusite} onChange={this.handlenomdusiteChange} />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="typedetablissement"><b>Type d'établissement</b></label>
                  </div>
                  <div class="col-md-6">
                    <select type="text" class="form-control" value={this.state.typedetablissement} onChange={this.handletypedetablissementChange}  >
                      {optionslistetypedetablissement}
                    </select>
                  </div>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label><b>Ville</b></label>
                  <input type="text" class="form-control" name="ville" value={this.state.ville_nom} onChange={this.handleChangeVille}></input>
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

              </div>
              <div class="col-md-6">

              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="type"><b>Type de mission</b></label>
                  </div>
                  <div class="col-md-6">
                    <select type="text" class="form-control" value={this.state.type} onChange={this.handletypeChange}  >
                      {optionslistetype}
                    </select>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="specialite"><b>Spécialité</b></label>
                  </div>
                  <div class="col-md-6">
                    <select type="text" class="form-control" value={this.state.specialite} onChange={this.handlespecialiteChange}  >
                      {optionslistespecialite}
                    </select>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="datededebut"><b>Date de début</b></label>
                    <input type="date" class="form-control" value={this.state.datededebut} onChange={this.handledatededebutChange} />
                  </div>
                  <div class="col-md-6">
                    <label for="datedefin"><b>Date de fin</b></label>
                    <input type="date" class="form-control" value={this.state.datedefin} onChange={this.handledatedefinChange} />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <label for="heurededebut"><b>Heure de début</b></label>
                    <input type="time" class="form-control" value={this.state.heurededebut} onChange={this.handleheurededebutChange} />
                  </div>
                  <div class="col-md-6">
                    <label for="heuredefin"><b>Heure de fin</b></label>
                    <input type="time" class="form-control" value={this.state.heuredefin} onChange={this.handleheuredefinChange} />
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
                      <input type="number" class="form-control" value={this.state.remuneration} onChange={this.handleremunerationChange} placeholder="0" />
                    </div>
                  </div>
                  <div class="col-md-3">
                      <select type="text" class="form-control" value={this.state.typeremuneration} onChange={this.handletyperemunerationChange}  >
                        {optionslistetypedremuneration}
                      </select>
                  </div>
                </div>
              </div>



              </div>
            </div>

            <div class="form-group">
              <label for="commentaires"><b>Commentaires</b></label>
              <input type="text-area" class="form-control" value={this.state.commentaires} onChange={this.handlecommentairesChange} />
            </div>

            <div class="form-row">
              <button type="submit" class="btn btn-md btn-block" id="addNewElement" >Mettre à jour les changements</button>
            </div>

            <br></br>
          </form>
          <ReactNotify ref='notificator'/>
        </div>
    );
  }
}
