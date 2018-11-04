import React from 'react';
import '../Attraction/Attraction.css'
import MaintenanceCard from '../AttractionCard/MaintenanceCard.js'
import data from '../../maintenance.json'
import personnelData from '../../personnel.json'
import attractionData from '../../attraction.json'
import { SlideToggle } from 'react-slide-toggle';
import ReactNotify from 'react-notify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const uuidv4 = require('uuid/v4');


export default class Maintenance extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          maintenance: data,
          personnel: personnelData,
          attraction: attractionData,
          id:"",
          attractionName:"",
          techName:" ",
          date1:" ",
          date2:" ",
          modal: false,
          modified:false,
        };
        this.handleDate1Change = this.handleDate1Change.bind(this);
        this.handleDate2Change = this.handleDate2Change.bind(this);
        this.handleTechNameChange = this.handleTechNameChange.bind(this);
        this.handleAttractionNameChange = this.handleAttractionNameChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.toggle = this.toggle.bind(this);

      }
      toggle(id,name,date,price) {
        this.setState({
          modal: !this.state.modal
        });
        let maintenance;
        maintenance = this.state.maintenance

        for(let i = 0; i< maintenance.length; ++i)
          if(maintenance[i].id == id){
            this.setState({
              id:maintenance[i].id,
              attractionName:maintenance[i].attractionName,
              techName:maintenance[i].techName,
              date1:maintenance[i].date1,
              date2:maintenance[i].date2
            })
          }

      }

        handleDate1Change(event) {
          this.setState({date1: event.target.value});
        }

        handleDate2Change(event) {
          this.setState({date2: event.target.value});
        }
        handleTechNameChange(event) {
          this.setState({techName: event.target.value});
        }
        handleAttractionNameChange(event) {
          this.setState({attractionName: event.target.value});
        }

      handleSubmit(e) {
        e.preventDefault();
        let maintenance = this.state.maintenance;
        let newItem = {
          "attractionName":this.state.attractionName,
          "techName":this.state.techName,
          "date1":this.state.date1,
          "date2":this.state.date2};
          maintenance.push(newItem)
          this.setState({maintenance: maintenance});
        this.setState({attractionName:"",techName:"",date1:"",date2:""});
      this.refs.notificator.success("Succès", "Maintenance ajoutée !", 4000);
    }
    deleteItem(id){
      let maintenance;
      maintenance = this.state.maintenance
      for(let i = 0; i< maintenance.length; ++i)
        if(maintenance[i].id == id){
          maintenance[i].deleted = true;
          maintenance[i].modified = false;
        }

      this.setState({maintenance: maintenance});
    }

    componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    if(this.state.modified){
          this.toggle();
          this.updateItem();
          this.setState({modified:false})
    }

  }

    updateItem(){
      this.setState({modified:true})
      let maintenance;
      maintenance = this.state.maintenance

      for(let i = 0; i< maintenance.length; ++i)
        if(maintenance[i].id == this.state.id){
          maintenance[i].attractionName = this.state.attractionName;
          maintenance[i].techName = this.state.techName;
          maintenance[i].date1 = this.state.date1;
          maintenance[i].date2 = this.state.date2;


        }
      this.setState({maintenance: maintenance});


    }

    submit = (id,name,date,price) => {
   confirmAlert({
     message: 'Etes-vous sûr de vouloir supprimer cette maintenance ?',
     buttons: [
       {
         label: 'Oui',
         onClick: () => this.deleteItem(id)
       },
       {
         label: 'Non',

       }
     ]
   })
 };


  render() {
    let maintenance;
    maintenance = this.state.maintenance.map(attraction => {

    if(!attraction.deleted){
        return(
          <div class="col col-lg-5">
            <MaintenanceCard updateItem={this.toggle} deleteItem={this.submit} class="card" id={attraction.id} attractionName={attraction.attractionName} techName={attraction.techName} date1={attraction.date1} date2={attraction.date2} />
          </div>
        )
      }
    })
    let personnel;
    personnel = this.state.personnel.map(personnel => {
        return(
          <option>{personnel.fname} {personnel.name}</option>
        )

    })
    let attraction;
    attraction = this.state.attraction.map(attraction => {
        return(
          <option >{attraction.name}</option>
        )

    })



    return (
    <div class="container">
        <div>
        <SlideToggle collapsed >
          {({onToggle, setCollapsibleElement}) => (
            <div className="my-collapsible">
            <div class="row justify-content-md-center">
              <button type="button" class="btn btn-lg btn-block" id="addElement" onClick={onToggle}> Ajouter une attraction </button>
            </div>
      <div className="my-collapsible__content" ref={setCollapsibleElement}>
        <div className="my-collapsible__content-inner">
        <form onSubmit={this.handleSubmit.bind(this)} class="form">
        <div class="form-row">
        <div class="form-group col-md-6">
        <label for="nomdelattraction">Attraction</label>
        <select class="form-control" name="Attraction" value={this.state.attractionName} onChange={this.handleAttractionNameChange}>
        {attraction}
        </select>        </div>
        <div class="form-group col-md-6">
        <label for="nomdelattraction">Technicien</label>
        <select class="form-control" name="Technicien" value={this.state.techName} onChange={this.handleDate1Change}>
        {personnel}
      </select>
        </div>
        </div>
        <div class="form-row">
        <div class="form-group col-md-6">
        <label for="nomdelattraction">Dernière maintenance</label>
        <input type="date" class="form-control" value={this.state.date1} onChange={this.handleDate1Change} placeholder="24" />
        </div>
        <div class="form-group col-md-6">
        <label for="nomdelattraction">Prochaine maintenance</label>
        <input type="date" class="form-control" value={this.state.date2} onChange={this.handleDate2Change}  />
        </div>

        </div>

        <button type="submit" class="btn btn-md btn-block" id="addNewElement" onClick={onToggle}> Ajouter </button>
        </form>
          </div>
      </div>
    </div>
  )}
</SlideToggle>
            </div>
            <div class="row  justify-content-around">
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modifier une attraction</ModalHeader>
          <ModalBody>
          <form onSubmit={this.handleSubmit.bind(this)} >
          <div class="form-row">
          <div class="form-group col-md-6">
          <label for="nomdelattraction">Attraction</label>
          <select class="form-control" name="Attraction" value={this.state.attractionName} onChange={this.handleAttractionNameChange}>
          {attraction}
          </select>        </div>
          <div class="form-group col-md-6">
          <label for="nomdelattraction">Technicien</label>
          <select class="form-control" name="Technicien" value={this.state.techName} onChange={this.handleDate1Change}>
          {personnel}
        </select>
          </div>
          </div>
          <div class="form-row">
          <div class="form-group col-md-6">
          <label for="nomdelattraction">Dernière maintenance</label>
          <input type="date" class="form-control" value={this.state.date1} onChange={this.handleDate1Change} placeholder="24" />
          </div>
          <div class="form-group col-md-6">
          <label for="nomdelattraction">Prochaine maintenance</label>
          <input type="date" class="form-control" value={this.state.date2} onChange={this.handleDate2Change}  />
          </div>

          </div>
          </form>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" onClick={this.updateItem}>Modifier</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Annuler</Button>
          </ModalFooter>
        </Modal>

                {maintenance}
            </div>
            <ReactNotify ref='notificator'/>
          </div>
    );
  }
}
