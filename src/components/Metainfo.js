import { CircularProgress } from "@mui/material";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";

import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { NavBar } from "./nav/NavBar";


export const MetaInfo = () => (
  <> {document.readyState === 'complete' ? <>
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
    </> : <div><CircularProgress />...Loading your page</div>}
  </>
);