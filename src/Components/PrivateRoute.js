import React from "react";
import { Route, Redirect } from "react-router-dom";
import Signin from '../Components/Signin/Signin.js'

export default function PrivateRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  return (
    
    <Route
      {...rest}
      render={props =>{
        if(authenticated === true) { 
          return <Component {...props} {...rest} />
        }
        else if(authenticated === "attente" ){
          return <Redirect to="/usercreated" />
        }
        else if(authenticated === "complete_signup"){
          return <Redirect to="/signup"/>
        }
        else if(authenticated === "valide"){
          return <Redirect to="/rm_medecin"/>
        }
        else return <Signin></Signin>
      }
      }
    />
  );
}