import React from 'react';
import './Signin.css'
import listespecialite from '../../Jasons/listespecialite.json'
import listeregions1 from '../../Jasons/regions.json'
import * as firebase from 'firebase';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredVilles: [{ "nom": "Choisir une ville", "region": { "nom": "" } }],
      filteredRegions: listeregions1
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeRegion = this.handleChangeRegion.bind(this)
    this.handleChangeVille = this.handleChangeVille.bind(this)
    this.handleVilleSelection = this.handleVilleSelection.bind(this)
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Ville & région
  displayVilles() {
    return this.state.filteredVilles.map((ville) => {
      if (ville.nom === "Choisir une ville") {
        return <option value="">{ville.nom}</option>
      }
      else return <option value={ville.nom} >{ville.nom}</option>
    }
    )
  }
  displayRegions() {
    return this.state.filteredRegions.map((region) => {
      if (region.nom === "Choisir une région") {
        return <option value="" code={region.code}>{region.nom}</option>
      }
      else return <option value={region.nom} code={region.code}>{region.nom}</option>
    }
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
      region_selected: [this.state.filteredVilles[event.target.selectedIndex].region.nom][0],
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
        console.log(villeVilles)
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


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();

    var user = firebase.auth().currentUser;
    if (user) {
    } else {
      alert("Error submitting form please try signin up again!")
      document.location.href = '/login'
    }
  
    firebase.database().ref('users/' + user.uid).set(
      {
        // name: user.displayName===undefined ?  "Anonymous":user.displayName, //BECAUSE ANONYMOUS LOG ALOWED
        // email:user.email===undefined ? "Anonymous": user.email , //BECAUSE ANONYMOUS LOG ALOWED
        // phone: user.phone=== undefined? "Anonymous": user.phone,//BECAUSE ANONYMOUS LOG ALOWED
        name: user.displayName!==undefined && user.displayName!==null? user.displayName:"Anonyme",
        email:user.email!==undefined && user.email!==null? user.email:"Anonyme",
        bdate: this.state.naissance,
        rue: this.state.rue,
        ville: this.state.ville_selected,
        region: this.state.region_selected,
        tel: this.state.tel,
        specialite: this.state.specialite,
        RPPS: this.state.RPPS,
        statut: "En attente",
        createdOn: firebase.database.ServerValue.TIMESTAMP
      }, function (error) {
        if (error) {
        } else {
          document.location.href = '/usercreated'
        }
      });

  }


  optionslistespecialite() {
    let i = 0;
    return listespecialite.map(listespecialite => {
      if (i === 0) {
        i++;
        return <option value="">{listespecialite}</option>
      }
      else return (
        <option value={listespecialite}>{listespecialite}</option>
      )
    })
  }


  render() {
    return (

      <div id="wrapper">
        <form id="login" onSubmit={this.handleSubmit.bind(this)}>
          <h2>Compléter le profil:</h2>
          
          <div class="form-group">
            <div class="form-row">
              <div class="col-md-6">
                <label for="naissance"><b>Date de naissance</b></label>
              </div>
              <div class="col-md-6">
                <input type="date" class="form-control" name="naissance" onChange={this.handleChange} required></input>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="form-row">
              <div class="col-md-6">
                <label for="rue"><b>Rue et numéro</b></label>
              </div>
              <div class="col-md-6">
                <input type="text" class="form-control" name="rue" placeholder="Ex: 37 Quai de Grenelle" onChange={this.handleChange} required></input>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label><b>Ville</b></label>
              <input type="text" class="form-control" name="ville" value={this.state.ville_nom} onChange={this.handleChangeVille}></input>
              <select required type="text" class="form-control" name="ville" value={this.state.ville_selected} onChange={this.handleVilleSelection}>
                {this.displayVilles()}
              </select>
            </div>
            <div class="form-group col-md-6 ">
              <label><b>Région</b></label>
              <select required type="text" class="form-control" name="region" value={this.state.region_selected} onChange={this.handleChangeRegion}  >
                {this.displayRegions()}
              </select>
            </div>
          </div>

          <div class="form-group">
            <div class="form-row">
              <div class="col-md-6">
                <label for="tel"><b>Numéro de téléphone portable</b></label>
              </div>
              <div class="col-md-6">
                <input type="tel" class="form-control" name="tel" placeholder="Ex: 0645326789" onChange={this.handleChange} required></input>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="form-row">
              <div class="col-md-6">
                <label for="specialite"><b>Spécialité</b></label>
              </div>
              <div class="col-md-6">
                <select type="text" class="form-control" name="specialite" value={this.state.specialite} onChange={this.handleChange} required>
                  {this.optionslistespecialite()}
                </select>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="form-row">
              <div class="col-md-6">
                <label for="RPPS"><b>Numéro RPPS</b></label>
              </div>
              <div class="col-md-6">
                <input required type="number" class="form-control" name="RPPS" onChange={this.handleChange}></input>
              </div>
            </div>
          </div>
          <br></br>
          <button type="submit" class="btn btn-md btn-block" id="addNewElement">Valider</button>
        </form>
      </div>

    );
  }
}
