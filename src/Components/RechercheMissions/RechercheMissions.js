import React, {Component} from 'react';
import './AjoutMissions.css'
import * as firebase from 'firebase';


export default class AjoutMissions extends Component {
  constructor(props) {
        super(props);
        this.state = {
          nomission:1,
          listMissions:[]
        };

        
        this.componentDidMount=this.componentDidMount.bind(this)
      }

  componentDidMount(){
    const ref = firebase.database().ref('missions');
    //this.setState({nomission:3})
    ref.on('value', snap=>{
      snap.forEach(child=>{
        this.setState({
          nomission:child.val().nomission,
          listMissions:this.state.listMissions.concat(child.val())
      })
      })})
    
  }
  displayMissions(){
    let listItem=this.state.listMissions.map((mission, index)=>
      <li key={index} class="form-group form-row">
      <br></br>
      <div>
      <h3>Mission: {mission.nomission}</h3>
        <p>Date de début: {mission.datededebut}</p>
        <p>Date de fin: {mission.datedefin}</p>
        <p>Heure de fin: {mission.heuredefin}</p>
        <p>Région: {mission.region}</p>
        <p>Rémuneration: {mission.remuneration}</p>
        <p>Spécialite: {mission.specialite}</p>
        <p>Statut: {mission.statut}</p>
        <p>Type: {mission.type}</p>
        <p>Type d'établissement: {mission.typedetablissement}</p>
        <p>Ville: {mission.ville}</p>
      </div>
      </li> 
    );
    return(<ul>{listItem}</ul>)


  }

  render() {
    return(
      <div id="wrapper">
      <div class="container">
      
  
        <form>
        <br></br>

      
      <div class="form-group">
      <div class="form-row"> <div class="col-md-6">

      </div></div>
      </div>
      
      {this.displayMissions()}

      </form>
      

      </div>
      </div>
      
    );
   
  }
}
