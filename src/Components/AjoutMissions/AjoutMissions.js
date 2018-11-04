import React from 'react';
import './AjoutMissions.css'
import listetypedetablissement from '../../Jasons/listetypedetablissement.json'
import listespecialite from '../../Jasons/listespecialite.json'
import listetype from '../../Jasons/listetype.json'
import * as firebase from 'firebase';


export default class AjoutMissions extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          missioncount: "",
          nomission: Math.floor((Math.random()*1000)),
          ville: "",
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

        };
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
      }




  handlevilleChange(event) {
      this.setState({ville: event.target.value});
  }
  handletypedetablissementChange(event) {
      this.setState({typedetablissement: event.target.value});
  }
  handleregionChange(event) {
      this.setState({region: event.target.value});
  }
  handlespecialiteChange(event) {
      this.setState({specialite: event.target.value});
  }
  handletypeChange(event) {
      this.setState({type: event.target.value});
  }
  handledatededebutChange(event) {
      this.setState({datededebut: event.target.value});
  }
  handledatedefinChange(event) {
      this.setState({datedefin: event.target.value});
  }
  handleheurededebutChange(event) {
      this.setState({heurededebut: event.target.value});
  }
  handleheuredefinChange(event) {
      this.setState({heuredefin: event.target.value});
  }
  handleremunerationChange(event) {
      this.setState({remuneration: event.target.value});
  }
  handlecommentairesChange(event) {
      this.setState({commentaires: event.target.value});
  }

  getMissionCount(){
    let missioncount = 1;

    // rechercher toutes les missions avec la meme YYYY + MM

    return missioncount;
  }

  getSerialNumber(tmpserialnumber){
    let missioncount = this.getMissionCount(tmpserialnumber);

    missioncount = missioncount + 1;
    let serialnumber = "";



    if(missioncount < 10)
      serialnumber= "000" + missioncount;

    if(missioncount < 100 && missioncount >= 10)
      serialnumber= "00" + missioncount;

    if(missioncount < 1000 && missioncount >= 100)
      serialnumber= "0" + missioncount;

    if(missioncount < 10000 && missioncount >= 1000)
      serialnumber= "" + missioncount;

    return serialnumber;
  }

  handleSubmit(e) {
        e.preventDefault();
        let tmpserialnumber = "" + this.state.datededebut.slice(0,4) + this.state.datededebut.slice(5,7 )
        this.state.nomission =  "" + tmpserialnumber + this.getSerialNumber(tmpserialnumber);
        const missionsetRef = firebase.database().ref('missions/' + this.state.nomission).set(
        {
          nomission: this.state.nomission,
          ville: this.state.ville,
          typedetablissement: this.state.typedetablissement,
          region: this.state.region,
          specialite: this.state.specialite,
          type: this.state.type,
          datededebut: this.state.datededebut,
          datedefin: this.state.datedefin,
          heurededebut: this.state.heurededebut,
          heuredefin: this.state.heuredefin,
          remuneration: this.state.remuneration,
          commentaires: this.state.commentaires,
          statut: "Recherche en cours"
        });
        this.setState({
          ville: "",
          typedetablissement: "",
          region: "",
          specialite: "",
          type: "",
          datededebut:"",
          datedefin: "",
          heurededebut: "",
          heuredefin: "",
          remuneration: "",
          commentaires: "",
        })

    }

  componentDidMount(){

    const missionRef = firebase.database().ref('missions');
    missionRef.on('value', snap =>{
      this.setState({
        missioncount : snap.val()
      });
    });

  }


  render() {

    let optionslistetypedetablissement;
    optionslistetypedetablissement = this.state.listetypedetablissement.map(listetypedetablissement => {
        return(
          <option >{listetypedetablissement}</option>
        )

    })

    let optionslistespecialite;
    optionslistespecialite = this.state.listespecialite.map(listespecialite => {
        return(
          <option >{listespecialite}</option>
        )

    })

    let optionslistetype;
    optionslistetype = this.state.listetype.map(listetype => {
        return(
          <option >{listetype}</option >
        )

    })



    return (
    <div class="container" >
      <h1 > Ajouter une mission {this.state.mission}</h1>
        <form onSubmit={this.handleSubmit.bind(this)} >

        <br/>




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

        <div class="form-group">
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
              <input type="text" class="form-control" value={this.state.region} onChange={this.handleregionChange}  />
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
              <label for="datededebut"><b>Date de début</b></label>
              <input type="date" class="form-control" value={this.state.datededebut} onChange={this.handledatededebutChange}  />
            </div>
            <div class="col-md-6">
            <label for="datedefin"><b>Date de fin</b></label>
            <input type="date" class="form-control" value={this.state.datedefin} onChange={this.handledatedefinChange}  />
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="form-row">
            <div class="col-md-6">
            <label for="heurededebut"><b>Heure de début</b></label>
            <input type="time" class="form-control" value={this.state.heurededebut} onChange={this.handleheurededebutChange}  />
            </div>
            <div class="col-md-6">
              <label for="heuredefin"><b>Heure de fin</b></label>
              <input type="time" class="form-control" value={this.state.heuredefin} onChange={this.handleheuredefinChange}  />
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
              <input type="number" class="form-control" value={this.state.remuneration} onChange={this.handleremunerationChange}  placeholder="0"/>
            </div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="commentaires"><b>Commentaires</b></label>
          <input type="text-area" class="form-control" value={this.state.commentaires} onChange={this.handlecommentairesChange}  />
        </div>

          <button type="submit" class="btn btn-md btn-block" id="addNewElement" >Partager la mission avec les médecins</button>
        </form>

    </div>
    );
  }
}
