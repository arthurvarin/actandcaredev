import React from 'react';
import './AttractionCard.css'

export default class AttractionCard extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          id: props.id,
          name: props.name,
          fname:props.fname,
          age: props.age,
          job: props.job,
          salary:props.salary,
          modified: false
      };

}
componentWillReceiveProps(){
  this.setState({id: this.props.id,
  name: this.props.name,
  fname:this.props.fname,
  age: this.props.age,
  job: this.props.job,
  salary:this.props.salary,})
}
  render() {
    function update(){
      this.setState({name:this.state.name,date:this.state.date,price:this.state.price})
      this.props.updateItem(this.state.id,this.state.name, this.state.date, this.state.price);
    }
    function deleteElement(){
      this.setState({deleted:true});
      this.props.deleteItem(this.state.id);
    }
    return (
        <div id="card" class="container">
          <div class="row title">
            <div class="col col-lg-9">
            <h3> {this.state.fname} {this.state.name} ({this.state.age})</h3>
            </div>

            <div class="col col-lg-1 icon ">
             <i class="material-icons edit" data-toggle="tooltip" data-placement="top" title="Modifier" onClick={update.bind(this)}>create</i>
             </div>
             <div class="col col-lg-1 icon">
              <i class="material-icons clear" data-toggle="tooltip" data-placement="top" title="Supprimer" onClick={deleteElement.bind(this)}>clear</i>
              </div>
             </div>
              <div class="row ">
               <div class="col col-lg-7">
                  Fonction:
               </div>
               <div class="col col-lg-4">
                  Salaire:
               </div>
            </div>
            <div class="row ">
              <div class="col col-lg-7 info">
                 {this.state.job}
              </div>
              <div class="col col-lg-4 info">
                 {this.state.salary}€/mois
              </div>
          </div>
        </div>
    );

  }
}
