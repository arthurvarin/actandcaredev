import React from 'react';
import './AttractionCard.css'

export default class AttractionCard extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          id: props.id,
          name: props.name,
          date: props.date,
          price: props.price,
          modified: false
      };

}
componentWillReceiveProps(){
  this.setState({id: this.props.id,
  name: this.props.name,
  date: this.props.date,
  price: this.props.price})
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
            <h3> {this.state.name} </h3>
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
                  Date dinstallation:
               </div>
               <div class="col col-lg-4">
                  Prix:
               </div>
            </div>
            <div class="row ">
              <div class="col col-lg-7 info">
                 {this.state.date}
              </div>
              <div class="col col-lg-4 info">
                 {this.state.price}€
              </div>
          </div>
        </div>
    );

  }
}
