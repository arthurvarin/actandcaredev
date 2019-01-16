import React from "react";
import { Route, Redirect } from "react-router-dom";

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
          return <Redirect to="/signup" />
        }
      }
      }
    />
  );
}

/*  <Route
{...rest}
render={props =>{
    if(authenticated === true) { 
      <Component {...props} {...rest} />
    }
    else if(authenticated === "attente" ){
      <Redirect to="/usercreated" />
    }
    else if(authenticated === "complete_signup"){
      <Redirect to="/signup" />
    }
  }} */

/* return (
  <Route
    {...rest}
    render={props =>
      authenticated === true ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
); */