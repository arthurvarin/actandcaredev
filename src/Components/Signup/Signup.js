import React from 'react';
import './Signin.css'
import listespecialite from '../../Jasons/listespecialite.json'
import listeregions1 from '../../Jasons/regions.json'

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      filteredVilles: [{ "nom": "Choisir une ville", "region": { "nom": "" } }],
      filteredRegions: listeregions1
    }
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
    this.getnomdusite()
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



  optionslistespecialite() { return listespecialite.map(listespecialite => {
    return (
      <option >{listespecialite}</option>
    )
  })}


  render() {
    return (

      <div id="wrapper">
        <form id="login">
          <h2>Compléter le profile:</h2>

          <div class="form-group">
            <div class="form-row">
              <div class="col-md-6">
                <label for="specialite"><b>Date de naissance</b></label>
              </div>
              <div class="col-md-6">
                <input type="date" class="form-control"></input>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="form-row">
              <div class="col-md-6">
                <label for="specialite"><b>Rue et numéro</b></label>
              </div>
              <div class="col-md-6">
              <input type="text" class="form-control" placeholder="Ex: 37 Quai de Grenelle"></input>
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
                  {/* <select type="text" class="form-control" name="region" value={this.state.region}  > */}
                  {this.displayRegions()}
                </select>
              </div>
            </div>




          <div class="form-group">
            <div class="form-row">
              <div class="col-md-6">
                <label for="specialite"><b>Numéro de téléphone portable</b></label>
              </div>
              <div class="col-md-6">
              <input type="tel" class="form-control" placeholder="Ex: 0645326789"></input>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="form-row">
              <div class="col-md-6">
                <label for="specialite"><b>Spécialité</b></label>
              </div>
              <div class="col-md-6">
              <select type="text" class="form-control" value={this.state.specialite} onChange={this.handlespecialiteChange} >
                {this.optionslistespecialite()}
              </select>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="form-row">
              <div class="col-md-6">
                <label for="specialite"><b>Numéro RPPS</b></label>
              </div>
              <div class="col-md-6">
              <input type="number" class="form-control"></input>
              </div>
            </div>
          </div>



        </form>
      </div>
      // <div id="firebaseui-auth-container"></div>

    );
  }
}
