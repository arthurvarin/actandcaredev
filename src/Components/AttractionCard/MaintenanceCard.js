import React from 'react';
import './AttractionCard.css'

export default class MaintenanceCard extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          id: props.id,
          attractionName: props.attractionName,
          techName: props.techName,
          date1: props.date1,
          date2: props.date2,
          modified: false
      };

}
componentWillReceiveProps(){
  this.setState({id: this.props.id,
  attractionName: this.props.attractionName,
  techName: this.props.techName,
  date1: this.props.date1,
  date2: this.props.date2})
}
  render() {
    function update(){
      this.setState({attractionName:this.state.attractionName,techName:this.state.techName,date1:this.state.date1,date2:this.state.date2})
      this.props.updateItem(this.state.id,this.state.attractionName, this.state.techName, this.state.date1,this.state.date2);
    }
    function deleteElement(){
      this.setState({deleted:true});
      this.props.deleteItem(this.state.id);
    }
    return (
        <div id="card" class="container">
          <div class="row title">
            <div class="col col-lg-9">
            <h3> {this.state.attractionName} </h3>
            </div>
            <div class="col col-lg-1 icon ">
             <i class="material-icons edit" data-toggle="tooltip" data-placement="top" title="Modifier" onClick={update.bind(this)}>create</i>
             </div>
             <div class="col col-lg-1 icon">
              <i class="material-icons clear" data-toggle="tooltip" data-placement="top" title="Supprimer" onClick={deleteElement.bind(this)}>clear</i>
              </div>
             </div>
              <div class="row ">
               <div class="col col-lg-6">
                  Dernière maintenance:
               </div>
               <div class="col col-lg-6">
                  Prochaine maintenance:
               </div>
            </div>
            <div class="row ">
              <div class="col col-lg-6 info">
                 {this.state.date1}
              </div>
              <div class="col col-lg-6 info">
                 {this.state.date2}
              </div>
          </div>
        </div>
    );

  }
}
