import React, { Component } from 'react';
import Navbar from '../NavbarMedecin/NavbarMedecin.js'
import Password from '../Password/Password.js'
import * as firebase from 'firebase'
import listeregions1 from '../../Jasons/regions.json'
import listespecialite from '../../Jasons/listespecialite.json'
import ReactNotify from 'react-notify';
import Modal from 'react-responsive-modal';


export default class AccountMedecin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, modif: false,  ////Ville & région ////
      coderegion: 0,
      filteredVilles: [{ "nom": "Choisir une ville", "region": { "nom": "" } }],
      filteredRegions: listeregions1,
      open: false,
      openReauth: false
    }
    //this.display = this.display.bind(this)


    //// Ville & région

    this.displayVilles = this.displayVilles.bind(this)
    this.displayRegions = this.displayRegions.bind(this)
    this.handleChangeRegion = this.handleChangeRegion.bind(this)
    this.handleChangeVille = this.handleChangeVille.bind(this)
    this.filterVilles = this.filterVilles.bind(this)
    this.handleVilleSelection = this.handleVilleSelection.bind(this)
  }

  componentDidMount() {
    var user = firebase.auth().currentUser;
    if (user) {
      this.setState({ user })
    } else {
      alert("User not signed in !!!")
    }
    const ref = firebase.database().ref('/users/' + user.uid);
    ref.on('value', (snap) => {
      let account = snap.val()
      //alert(account.email, account.RPPS, account.region)
      this.setState({
        email: account.email,
        name: account.name,


        rue: account.rue,
        specialite: account.specialite,
        RPPS: account.RPPS,
        bdate: account.bdate,
        tel: account.tel,

        ville_nom: account.ville,
        ville_selected: account.ville,
        region_selected: account.region,

        loading: false
      })
    })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault();

    //alert("openReauth handleSubmit"+this.state.openReauth)

    let user = this.state.user

    user.updateEmail(this.state.email).then(() => {
      user.updateProfile({
        displayName: this.state.name,
      }).then(() => {
        firebase.database().ref('users/' + user.uid).update({
          //Auth specific
          email: this.state.email,
          name: this.state.name,
          //DB only
          RPPS: this.state.RPPS,
          bdate: this.state.bdate,
          rue: this.state.rue,
          specialite: this.state.specialite,
          tel: this.state.tel,
          ville: this.state.ville_selected,
          region: this.state.region_selected
        }, () => {
          //this.refs.notificator.success("Succès", "Le compte a été mise à jour ", 4000);
          this.setState({ modif: false }) // PROBLEM
        })
      }).catch(function (error) {
        alert(error.message)
        console.log(error)
        this.setState({ email: this.state.user.displayName })
      });
    }).catch((error) => {
      alert(error.message)
      console.log(error)
      this.setState({ email: this.state.user.email })
    });
  }
  deleteAccount() {
    let user = this.state.user;
    firebase.database().ref('users/' + user.uid).remove(()=>{
      alert("Your account as well as all your data has been deleted")
      user.delete().then(()=> {
        window.location.href="/login"
      }).catch(function (error) {
        alert(error.message +"this is errorrrr")
        console.log(error)
      });
    })
  }


  modif(e) {
    e.preventDefault();
    this.setState({ modif: true })
  }
  modifier(e) {
    e.preventDefault();
    this.setState({ openReauth: true })
  }
  openModal(e) {
    e.preventDefault();
    this.setState({ open: true })
  }
  onCloseModal() {
    this.setState({ open: false });
  };

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

  reauth(e) {
    e.preventDefault()

    // Prompt the user to re-provide their sign-in credentials
    let email = this.state.user.email
    let password = this.state.password

    var credentials = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    this.state.user.reauthenticateAndRetrieveDataWithCredential(credentials).then(() => {
      this.setState({ modif: true, openReauth: false })
    }).catch(function (error) {
      alert(error.message)
      console.log(error)
    });
  }

  onCloseModalReauth() {
    this.setState({ openReauth: false })
  }

  render() {
    let optionslistespecialite;
    optionslistespecialite = listespecialite.map(listespecialite => {
      return (
        <option >{listespecialite}</option>
      )

    })

    const { loading, modif, open, openReauth, user } = this.state;


    if (loading) return <p>Updating ...</p>
    else if (!modif) return (
      <div>
        <header>
          <Navbar></Navbar>
        </header>

        <div id="wrapper">
          <Modal open={open} onClose={this.onCloseModal.bind(this)} center>
            <Password user={user} open={open}></Password>
          </Modal>

          <Modal open={openReauth} onClose={this.onCloseModalReauth.bind(this)} center>
            <div class="container" >
              <h1 > Merci de vous réauthentifier </h1>
              <form onSubmit={this.reauth.bind(this)} >

                <br />

                <div class="form-row">
                  <div class="col-md-6">

                    <div class="form-group">
                      <div class="form-row">
                        <div class="col-md-6">
                          <label for="typedetablissement"><b>Mot de passe: </b></label>
                        </div>
                        <div class="col-md-6">
                          <input type="password" name="password" value={this.state.password} class="form-control" onChange={this.handleChange.bind(this)} />
                        </div>
                      </div>
                    </div>

                  </div></div>

                <div class="form-row">
                  <button type="submit" class="btn btn-md btn-block" id="addNewElement" >Valider</button>
                </div>

              </form>


            </div>
          </Modal>



          <div class="container" >
          <br></br>
          
            <form onSubmit={this.modifier.bind(this)} >
              
              <br />

              <div class="form-row">
                <div class="col-md-6">

                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-6">
                        <label for="typedetablissement"><b>Email: </b></label>
                      </div>
                      <div class="col-md-6">
                        <input disabled type="text" class="form-control" value={this.state.email} />
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-6">
                        <label for="typedetablissement"><b>Nom: </b></label>
                      </div>
                      <div class="col-md-6">
                        <input disabled type="text" class="form-control" value={this.state.name} />
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-6">
                        <label for="typedetablissement"><b>RPPS: </b></label>
                      </div>
                      <div class="col-md-6">
                        <input disabled type="text" class="form-control" value={this.state.RPPS} />
                      </div>
                    </div>
                  </div>


                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-6">
                        <label for="typedetablissement"><b>Spécialité: </b></label>
                      </div>
                      <div class="col-md-6">
                        <input disabled type="text" class="form-control" value={this.state.specialite} />
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-6">
                        <label for="typedetablissement"><b>Rue: </b></label>
                      </div>
                      <div class="col-md-6">
                        <input disabled type="text" class="form-control" value={this.state.rue} />
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-6">
                        <label for="typedetablissement"><b>Téléphone: </b></label>
                      </div>
                      <div class="col-md-6">
                        <input disabled type="text" class="form-control" value={this.state.tel} />
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
                      <input disabled type="text" class="form-control" name="region" value={this.state.region_selected}>
                      </input>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-6">
                        <label for="datededebut"><b>Date de naissance</b></label>
                        <input disabled type="date" class="form-control" value={this.state.bdate} />
                      </div>
                    </div>
                  </div>

                </div></div>

              <div class="form-row">
                <button type="submit" class="btn btn-md btn-block" id="addNewElement" >Modifier mes informations</button>
              </div>

              <br></br>

              <div class="form-row">
                <button class="btn btn-md btn-block" id="addNewElement" onClick={this.openModal.bind(this)} >Mettre à jour le mot de passe</button>
              </div>

            </form>


          </div>
        </div>
      </div>
    );
    else if (modif) return (
      <div>
        <header>
          <Navbar></Navbar>
        </header>
        <div id="wrapper">
          <div class="container" >
          <br></br>
            <form onSubmit={this.handleSubmit.bind(this)} >

              <br />
       

              <div class="form-row">
                <div class="col-md-6">

                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-6">
                        <label for="typedetablissement"><b>Email: </b></label>
                      </div>
                      <div class="col-md-6">
                        <input type="text" class="form-control" name="email" value={this.state.email} onChange={this.handleChange.bind(this)} />
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-6">
                        <label for="typedetablissement"><b>Nom: </b></label>
                      </div>
                      <div class="col-md-6">
                        <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.handleChange.bind(this)} />
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-6">
                        <label for="typedetablissement"><b>RPPS: </b></label>
                      </div>
                      <div class="col-md-6">
                        <input type="text" class="form-control" name="RPPS" value={this.state.RPPS} onChange={this.handleChange.bind(this)} />
                      </div>
                    </div>
                  </div>


                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-6">
                        <label for="typedetablissement"><b>Spécialité: </b></label>
                      </div>
                      <div class="col-md-6">
                        <select type="text" class="form-control" name="specialite" value={this.state.specialite} onChange={this.handleChange.bind(this)}  >
                          {optionslistespecialite}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-6">
                        <label for="typedetablissement"><b>Rue: </b></label>
                      </div>
                      <div class="col-md-6">
                        <input type="text" class="form-control" name="rue" value={this.state.rue} onChange={this.handleChange.bind(this)} />
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-6">
                        <label for="typedetablissement"><b>Téléphone: </b></label>
                      </div>
                      <div class="col-md-6">
                        <input type="text" class="form-control" name="tel" value={this.state.tel} onChange={this.handleChange.bind(this)} />
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

                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-6">
                        <label for="datededebut"><b>Date de naissance</b></label>
                        <input type="date" class="form-control" name="bdate" value={this.state.bdate} onChange={this.handleChange.bind(this)} />
                      </div>
                    </div>
                  </div>

                </div></div>

              <div class="form-row">
                <button type="submit" class="btn btn-md btn-block" id="addNewElement" >Mettre à jour les changements</button>
              </div>

              <br></br>


              <div class="form-row">
                <button onClick={this.deleteAccount.bind(this)} class="col-md-5 btn btn-md" id="addNewElement" >Supprimer mon compte et mes données</button>
              </div>

            </form>
            <ReactNotify ref='notificator' />
          </div>
        </div>
      </div>
    );
  }
}
