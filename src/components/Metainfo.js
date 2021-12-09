import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";

import { Login } from "./auth/Login";
import { Register } from "./auth/Register";


export const MetaInfo = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("meta_customer")) {
          return (
            <>
              
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
);