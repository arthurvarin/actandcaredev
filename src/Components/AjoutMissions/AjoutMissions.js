import React from 'react';
import './AjoutMissions.css'
import listetypedetablissement from '../../Jasons/listetypedetablissement.json'
import listespecialite from '../../Jasons/listespecialite.json'
import listetype from '../../Jasons/listetype.json'
import listeregions1 from '../../Jasons/regions.json'
import * as firebase from 'firebase';


export default class AjoutMissions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      missioncount: "",
      nomission: Math.floor((Math.random() * 1000)),
      nomdusite: "",
      ville: "",
      ville_selected:"",
      region_selected:"",
      typedetablissement: "",
      region: "",
      specialite: "",
      type: "",
      datededebut: "",
      datedefin: "",
      heurededebut: "",
      heuredefin: "",
      remuneration: "",
      commentaires: "",
      listetypedetablissement: listetypedetablissement,
      listespecialite: listespecialite,
      listetype: listetype,
      mission: "",
      nomdusitemanual: false,

      ////Ville & région ////
      coderegion: 0,
      filteredVilles: [{ "nom": "Choisir une ville", "region": { "nom": "" } }],
      filteredRegions: listeregions1

    };
    this.handlenomdusiteChange = this.handlenomdusiteChange.bind(this);
    this.handlevilleChange = this.handlevilleChange.bind(this);
    this.handletypedetablissementChange = this.handletypedetablissementChange.bind(this);
    this.handleregionChange = this.handleregionChange.bind(this);
    this.handlespecialiteChange = this.handlespecialiteChange.bind(this);
    this.handletypeChange = this.handletypeChange.bind(this);
    this.handledatededebutChange = this.handledatededebutChange.bind(this);
    this.handledatedefinChange = this.handledatedefinChange.bind(this);
    this.handleheurededebutChange = this.handleheurededebutChange.bind(this);
    this.handleheuredefinChange = this.handleheuredefinChange.bind(this);
    this.handleremunerationChange = this.handleremunerationChange.bind(this);
    this.handlecommentairesChange = this.handlecommentairesChange.bind(this);
    this.getnomdusite = this.getnomdusite.bind(this);


    //// Ville & région

    this.displayVilles = this.displayVilles.bind(this)
    this.displayRegions = this.displayRegions.bind(this)
    this.handleChangeRegion = this.handleChangeRegion.bind(this)
    this.handleChangeVille = this.handleChangeVille.bind(this)
    this.filterVilles = this.filterVilles.bind(this)
    this.handleVilleSelection = this.handleVilleSelection.bind(this)

  }


  getnomdusite() {
    if (this.state.nomdusitemanual === false) {

      let toreturn = "";

      if (this.state.ville !== undefined && this.state.ville !== "" && this.state.typedetablissement !== undefined && this.state.typedetablissement !== "") {
        toreturn = "" + this.state.typedetablissement + " de " + this.state.ville;
      }

      this.setState({ nomdusite: toreturn });
    }
  }

  handlevilleChange(event) {
    this.setState({ ville: event.target.value });
    this.getnomdusite()
  }
  handlenomdusiteChange(event) {

    this.setState({ nomdusite: event.target.value, nomdusitemanual: true });
  }
  handletypedetablissementChange(event) {
    this.setState({ typedetablissement: event.target.value });
    this.getnomdusite()
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

  getMissionCount(tmpserialnumber) {
    let missioncount = 0;

    const missionRef = firebase.database().ref('missions');
    missionRef.on('child_added', snap => {

      let mission = snap.val();
      let serialnumber = "" + mission.datededebut.slice(0, 4) + mission.datededebut.slice(5, 7);

      if (serialnumber.valueOf() === tmpserialnumber.valueOf() && mission.nomission.length < 12) {
        missioncount++;
      }

      if (serialnumber.valueOf() === tmpserialnumber.valueOf() && mission.nomission.length > 12) {
        if (mission.nomission.charAt(12) === '1') {
          missioncount++;
        }
      }
    });

    return missioncount;
  }

  getSerialNumber(tmpserialnumber) {
    let missioncount = this.getMissionCount(tmpserialnumber);

    missioncount = missioncount + 1;
    let serialnumber = "";

    if (missioncount < 10)
      serialnumber = "000" + missioncount;

    if (missioncount < 100 && missioncount >= 10)
      serialnumber = "00" + missioncount;

    if (missioncount < 1000 && missioncount >= 100)
      serialnumber = "0" + missioncount;

    if (missioncount < 10000 && missioncount >= 1000)
      serialnumber = "" + missioncount;

    return serialnumber;
  }

  ajouterMission(datededebut, tmpserialnumber, endserialnumber, extra) {
    let typedetablissement = this.state.typedetablissement;
    let type = this.state.type;
    let ville = this.state.ville_selected;
    let region = this.state.region_selected;
    let specialite = this.state.specialite;
    let nomdusite = this.state.nomdusite;
    console.log(region)
    console.log(ville)

    if (typedetablissement === "Veuillez selectionner un type d'établissement")
      typedetablissement = "";

    if (type === "Veuillez selectionner un type de mission")
      type = "";

    if (specialite === "Veuillez selectionner une spécialité")
      specialite = "";

    if (region === "Veuillez selectionner une région")
      region = "";


    this.setState({ nomission: "M" + tmpserialnumber + endserialnumber + extra })
    this.state.nomission = "M" + tmpserialnumber + endserialnumber + extra;

    if (extra == "") {
      const missionsetRef = firebase.database().ref('missions/' + this.state.nomission).set(
        {
          nomission: this.state.nomission,
          ville: ville,
          nomdusite: nomdusite,
          typedetablissement: typedetablissement,
          region: region,
          specialite: specialite,
          type: type,
          datededebut: datededebut,
          datedefin: datededebut,
          heurededebut: this.state.heurededebut,
          heuredefin: this.state.heuredefin,
          remuneration: this.state.remuneration,
          commentaires: this.state.commentaires,
          statut: "Recherche en cours"
        });
    } else {
      const missionsetRef = firebase.database().ref('missions/' + this.state.nomission).set(
        {
          nomission: this.state.nomission,
          ville: ville,
          nomdusite: nomdusite,
          typedetablissement: typedetablissement,
          region: region,
          specialite: specialite,
          type: type,
          datededebut: datededebut,
          datedefin: this.state.datedefin,
          heurededebut: this.state.heurededebut,
          heuredefin: this.state.heuredefin,
          remuneration: this.state.remuneration,
          commentaires: this.state.commentaires,
          statut: "Recherche en cours"
        });
    }

    this.setState({
      ville: "",
      typedetablissement: "",
      nomdusite: "",
      region: "",
      specialite: "",
      type: "",
      datededebut: "",
      datedefin: "",
      heurededebut: "",
      heuredefin: "",
      remuneration: "",
      commentaires: "",
    })
  }

  getDates(date1, date2) {
    let returnarray = new Array();
    let currentDate = date1;
    while (currentDate.valueOf() <= date2.valueOf()) {
      returnarray.push(new Date(currentDate));
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }
    return returnarray;
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.datededebut.length > 0 && this.state.datedefin.length === 0) {
      let tmpserialnumber = "" + this.state.datededebut.slice(0, 4) + this.state.datededebut.slice(5, 7);
      let endserialnumber = this.getSerialNumber(tmpserialnumber);

      this.ajouterMission(this.state.datededebut, tmpserialnumber, endserialnumber, "");
    }

    if (this.state.datededebut.length > 0 && this.state.datedefin.length > 0) {
      let datededebut = new Date(this.state.datededebut.slice(0, 4), this.state.datededebut.slice(5, 7) - 1, this.state.datededebut.slice(8, 10));
      let datedefin = new Date(this.state.datedefin.slice(0, 4), this.state.datedefin.slice(5, 7) - 1, this.state.datedefin.slice(8, 10));

      let tabdates = [];
      tabdates = this.getDates(datededebut, datedefin);

      let tmpserialnumber = "" + this.state.datededebut.slice(0, 4) + this.state.datededebut.slice(5, 7);
      let endserialnumber = this.getSerialNumber(tmpserialnumber);

      for (let i = 0; i < tabdates.length; i++) {
        let stringdate = "" + tabdates[i].getFullYear() + "-" + (tabdates[i].getMonth() + 1) + "-" + tabdates[i].getDate();
        this.ajouterMission(stringdate, tmpserialnumber, endserialnumber, "-" + (i + 1));
      }
    }

  }

  componentDidMount() {

    const missionRef = firebase.database().ref('missions');
    missionRef.on('value', snap => {
      this.setState({
        missioncount: snap.val()
      });
    });

    this.timerID = setInterval(
      () => this.tick(),
      500
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.getnomdusite();
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
        console.log(villeVilles)
        if (villeVilles !== undefined) {
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



    return (
      <div id="wrapper">
        <div class="container" >
          <h1 > Ajouter une mission {this.state.mission}</h1>
          <form onSubmit={this.handleSubmit.bind(this)} >

            <br />

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
                  <label for="typedetablissement"><b>Type d'établissement</b></label>
                </div>
                <div class="col-md-6">
                  <select type="text" class="form-control" value={this.state.typedetablissement} onChange={this.handletypedetablissementChange}  >
                    {optionslistetypedetablissement}
                  </select>
                </div>
              </div>
            </div>


            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* Ville & Région  */}
            {/* <div class="form-group">
          <div class="form-row">
            <div class="col-md-6">
              <label for="ville"><b>Ville</b></label>
            </div>
            <div class="col-md-6">
              <input type="text" class="form-control" value={this.state.ville} onChange={this.handlevilleChange}  />
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="form-row">
            <div class="col-md-6">
              <label for="region"><b>Région</b></label>
            </div>
            <div class="col-md-6">
            <select type="text" class="form-control" value={this.state.region} onChange={this.handleregionChange}  >
              {optionslisteregions}
              </select>  </div>
          </div>
        </div> */}


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
                  {/* <select type="text" class="form-control" name="region" value={this.state.region}  > */}
                  {this.displayRegions()}
                </select>
              </div>
            </div>


            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

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
                <div class="col-md-6">
                  <label for="remuneration"><b>Rémunération</b></label>
                </div>
                <div class="col-md-6">
                  <div class="input-group input-group-default mb-3">

                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroup-sizing-default">€</span>
                    </div>
                    <input type="number" class="form-control" value={this.state.remuneration} onChange={this.handleremunerationChange} placeholder="0" />
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="commentaires"><b>Commentaires</b></label>
              <input type="text-area" class="form-control" value={this.state.commentaires} onChange={this.handlecommentairesChange} />
            </div>

            <button type="submit" class="btn btn-md btn-block" id="addNewElement" >Partager la mission avec les médecins</button>
            <br></br>
          </form>

        </div>
      </div>
    );
  }
}
