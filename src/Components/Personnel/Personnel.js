import React from 'react';
import '../Attraction/Attraction.css'
import PersonnelCard from '../AttractionCard/PersonnelCard.js'
import data from '../../personnel.json'
import { SlideToggle } from 'react-slide-toggle';
import ReactNotify from 'react-notify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const uuidv4 = require('uuid/v4');


export default class Personnel extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          attractions: data,
          id:"",
          name:"",
          fname:"",
          age:"",
          job:"",
          salary:"",
          modal: false,
          modified:false,
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleFnameChange = this.handleFnameChange.bind(this);
        this.handleJobChange = this.handleJobChange.bind(this);
        this.handleSalaryChange = this.handleSalaryChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.toggle = this.toggle.bind(this);

      }
      toggle(id,name,fname,age,job,salary) {
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
              fname:attractions[i].fname,
              age:attractions[i].age,
              job:attractions[i].job,
              salary:attractions[i].salary,
            })
          }

      }

        handleNameChange(event) {
          this.setState({name: event.target.value});
        }
        handleFnameChange(event) {
          this.setState({fname: event.target.value});
        }
        handleJobChange(event) {
          this.setState({job: event.target.value});
        }
        handleSalaryChange(event) {
          this.setState({salary: event.target.value});
        }
        handleAgeChange(event) {
          this.setState({age: event.target.value});
        }

      handleSubmit(e) {
        e.preventDefault();
        let attractions = this.state.attractions;
        let newItem = {
          "name":this.state.name,
          "fname":this.state.fname,
          "age":this.state.age,
          "job":this.state.job,
          "salary":this.state.salary};
          attractions.push(newItem)
          this.setState({attractions: attractions});
        this.setState({name:"",fname:"",age:"",job:"",salary:""});
      this.refs.notificator.success("Succès", "Employé ajoutée !", 4000);
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
      let attractions;
      attractions = this.state.attractions

      for(let i = 0; i< attractions.length; ++i)
        if(attractions[i].id == this.state.id){
          attractions[i].name = this.state.name;
          attractions[i].fname = this.state.fname;
          attractions[i].age = this.state.age;
          attractions[i].job = this.state.job;
          attractions[i].salary = this.state.salary;



        }
      this.setState({attractions: attractions});


    }

    submit = (id,name,date,price) => {
   confirmAlert({
     message: 'Etes-vous sûr de vouloir supprimer cet employé ?',
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
            <PersonnelCard updateItem={this.toggle} deleteItem={this.submit} class="card" id={attraction.id} name={attraction.name} fname={attraction.fname} age={attraction.age} job={attraction.job} salary={attraction.salary} />
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
              <button type="button" class="btn btn-lg btn-block" id="addElement" onClick={onToggle}> Ajouter un employé </button>
            </div>
      <div className="my-collapsible__content" ref={setCollapsibleElement}>
        <div className="my-collapsible__content-inner">
        <form onSubmit={this.handleSubmit.bind(this)} class="form">
        <div class="form-row">
        <div class="form-group col-md-6">
        <label for="nomdelattraction">Nom</label>
        <input type="text" class="form-control" value={this.state.name} onChange={this.handleNameChange} placeholder="Doe" />
        </div>
        <div class="form-group col-md-6">
        <label for="nomdelattraction">Prénom</label>
        <input type="text" class="form-control" value={this.state.fname} onChange={this.handleFnameChange} placeholder="John" />
        </div>
        </div>
        <div class="form-row">
        <div class="form-group col-md-4">
        <label for="nomdelattraction">Age</label>
        <input type="number" class="form-control" value={this.state.age} onChange={this.handleAgeChange} placeholder="24" />
        </div>
        <div class="form-group col-md-4">
        <label for="nomdelattraction">Fonction</label>
        <input type="text" class="form-control" value={this.state.job} onChange={this.handleJobChange} placeholder="Technicien" />
        </div>

        <div class="form-group col-md-4">
        <label for="inputPassword4">Salaire</label>
        <div class="input-group input-group-default mb-3">

        <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">€/mois</span>
        </div>
        <input type="number" class="form-control" value={this.state.salary} onChange={this.handleSalaryChange}  placeholder="0"/>
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
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modifier une attraction</ModalHeader>
          <ModalBody>
          <form onSubmit={this.handleSubmit.bind(this)} >
          <div class="form-row">
          <div class="form-group col-md-6">
          <label for="nomdelattraction">Nom</label>
          <input type="text" class="form-control" value={this.state.name} onChange={this.handleNameChange} placeholder="Doe" />
          </div>
          <div class="form-group col-md-6">
          <label for="nomdelattraction">Prénom</label>
          <input type="text" class="form-control" value={this.state.fname} onChange={this.handleFnameChange} placeholder="John" />
          </div>
          </div>
          <div class="form-row">
          <div class="form-group col-md-4">
          <label for="nomdelattraction">Age</label>
          <input type="number" class="form-control" value={this.state.age} onChange={this.handleAgeChange} placeholder="24" />
          </div>
          <div class="form-group col-md-4">
          <label for="nomdelattraction">Fonction</label>
          <input type="text" class="form-control" value={this.state.job} onChange={this.handleJobChange} placeholder="Technicien" />
          </div>

          <div class="form-group col-md-4">
          <label for="inputPassword4">Salaire</label>
          <div class="input-group input-group-default mb-3">

          <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">€/mois</span>
          </div>
          <input type="number" class="form-control" value={this.state.salary} onChange={this.handleSalaryChange}  placeholder="0"/>
          </div>

          </div>
          </div>

          </form>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" onClick={this.updateItem}>Modifier</Button>{' '}
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
