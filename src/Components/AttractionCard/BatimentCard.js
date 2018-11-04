import React from 'react';
import './AttractionCard.css'

export default class BatimentCard extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          id: props.id,
          name: props.name,
          date: props.date,
          modified: false
      };

}

componentWillReceiveProps(){
  this.setState({id: this.props.id,
  name: this.props.name,
  date: this.props.date,
  })
}
  render() {
    function update(){
      this.setState({name:this.state.name,date:this.state.date})
      this.props.updateItem(this.state.id,this.state.name, this.state.date);
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
               <div class="col col-lg-5">
                  Date dinstallation:
               </div>
               <div class="col col-lg-6 info">
                  {this.state.date}
               </div>

            </div>
            <div class="row ">


          </div>
        </div>
    );

  }
}
