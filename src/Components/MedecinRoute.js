import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function MedecinRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  return (
    
    <Route
      {...rest}
      render={props =>{
        if(authenticated === true || authenticated ==="valide") { 
          return <Component {...props} {...rest} />
        }
        else if(authenticated === "attente" ){
          return <Redirect to="/usercreated" />
        }
        else if(authenticated === "complete_signup"){
          return <Redirect to="/signup"/>
        }
        else return <Redirect to="/login" />
      }
      }
    />
  );
}