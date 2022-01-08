import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";

import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { NavBar } from "./nav/NavBar";


export const MetaInfo = () => {
  const [loading, setLoading] = useState(true)
  // added a progress circle for load times
  useEffect(
  () => {
    setTimeout(() => setLoading(false), 0)
    
  }, [])

  return ( <>
  {loading ? <CircularProgress sx = {{marginLeft: "50%", marginTop: "50%"}} /> : 
  <> 
    <Route
      render={() => {
        if (localStorage.getItem("meta_customer")) {
          return (
            <>
              <NavBar /> 
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
    
  </>
    }</>
)};