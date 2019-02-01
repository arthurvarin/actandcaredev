import React from 'react';
import {Redirect} from "react-router-dom";
import * as firebase from 'firebase';

export default class Logout extends React.Component {
  state={logged:true}
  componentDidMount() {
    firebase.auth().signOut().then(()=> {
      this.setState({logged:false})
    }).catch(function(error) {
      //alert(error.message)
      console.log(error)
    });
  }
  render(){
    if(!this.state.logged)return(<Redirect to="/login"/>)
    else return (<h1>Not logged in</h1>)
  }
}
