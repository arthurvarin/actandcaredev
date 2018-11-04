import React from 'react';
import './Attraction.css'
import AttractionCard from '../AttractionCard/AttractionCard.js'
import data from '../../attraction.json'
import { SlideToggle } from 'react-slide-toggle';
import ReactNotify from 'react-notify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const uuidv4 = require('uuid/v4');


export default class Attraction extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          attractions: data,
          id:"",
          name:"",
          price:" ",
          date:" ",
          modal: false,
          modified:false,
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.toggle = this.toggle.bind(this);

      }
      toggle(id,name,date,price) {
        this.setState({
          modal: !this.state.modal
        });
        let attractions;
        attractions = this.state.attractions

        for(let i = 0; i< attractions.length; ++i)
          if(attractions[i].id == id){
            this.setState({
              id:attractions[i].id,
              name:attractions[i].name,
              price:attractions[i].price,
              date:attractions[i].date
            })
          }

      }

        handleNameChange(event) {
          this.setState({name: event.target.value});
        }

        handlePriceChange(event) {
          this.setState({price: event.target.value});
        }
        handleDateChange(event) {
          this.setState({date: event.target.value});
        }

      handleSubmit(e) {
        e.preventDefault();
        let attractions = this.state.attractions;
        let newItem = {
          "name":this.state.name,
          "price":this.state.price,
          "date":this.state.date};
          attractions.push(newItem)
          this.setState({attractions: attractions});
        this.setState({name:"",price:"",date:""});
      this.refs.notificator.success("Succès", "Attraction ajoutée !", 4000);
    }
    deleteItem(id){
      let attractions;
      attractions = this.state.attractions
      for(let i = 0; i< attractions.length; ++i)
        if(attractions[i].id == id){
          attractions[i].deleted = true;
          attractions[i].modified = false;
        }

      this.setState({attractions: attractions});
      this.refs.notificator.success("Succès", "Attraction supprimée !", 4000);
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
          this.refs.notificator.success("Succès", "Attraction modifiée !", 4000);
    }

  }

    updateItem(){
      this.setState({modified:true})
      let attractions;
      attractions = this.state.attractions

      for(let i = 0; i< attractions.length; ++i)
        if(attractions[i].id == this.state.id){
          attractions[i].name = this.state.name;
          attractions[i].date = this.state.date;
          attractions[i].price = this.state.price;


        }
      this.setState({attractions: attractions});


    }

    submit = (id,name,date,price) => {
   confirmAlert({
     message: 'Etes-vous sûr de vouloir supprimer cette attraction ?',
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
    let attractions;
    attractions = this.state.attractions.map(attraction => {

    if(!attraction.deleted){
        return(
          <div class="col col-lg-5">
            <AttractionCard updateItem={this.toggle} deleteItem={this.submit} class="card" id={attraction.id} name={attraction.name} price={attraction.price} date={attraction.date} />
          </div>
        )
      }
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

        <div class="form-group">
        <label for="nomdelattraction">Nom de l'attraction</label>
        <input type="text" class="form-control" value={this.state.name} onChange={this.handleNameChange} placeholder="Le Grand Huit" />
        </div>

        <div class="form-row">
        <div class="form-group col-md-6">
        <label for="datedelinstallation">Date de l'installation</label>
        <input type="date" class="form-control" value={this.state.date} onChange={this.handleDateChange} />
        </div>

        <div class="form-group col-md-6">
        <label for="inputPassword4">Prix</label>
        <div class="input-group input-group-default mb-3">

        <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">€</span>
        </div>
        <input type="number" class="form-control" value={this.state.price} onChange={this.handlePriceChange}  placeholder="0"/>
        </div>

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
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}  >
          <ModalHeader toggle={this.toggle}>Modifier une attraction</ModalHeader>
          <ModalBody >
          <form onSubmit={this.handleSubmit.bind(this)}>

          <div class="form-group">
          <label for="nomdelattraction">Nom de l'attraction</label>
          <input type="text" class="form-control" value={this.state.name} onChange={this.handleNameChange} placeholder="Le Grand Huit" />
          </div>

          <div class="form-row">
          <div class="form-group col-md-6">
          <label for="datedelinstallation">Date de l'installation</label>
          <input type="date" class="form-control" value={this.state.date} onChange={this.handleDateChange} />
          </div>

          <div class="form-group col-md-6">
          <label for="inputPassword4">Prix</label>
          <div class="input-group input-group-default mb-3">

          <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">€</span>
          </div>
          <input type="number" required = "required" class="form-control" value={this.state.price} onChange={this.handlePriceChange}  placeholder="0"/>
          </div>
          </div>
          </div>
          </form>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" class="modalButton" onClick={this.updateItem}>Modifier</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Annuler</Button>
          </ModalFooter>
        </Modal>

                {attractions}
            </div>
            <ReactNotify ref='notificator'/>
          </div>
    );
  }
}
