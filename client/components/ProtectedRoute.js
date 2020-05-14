import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../utils/Auth.js";
import NavBar from './NavBar.jsx'

export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {
          return (
          <div>
            <Component {...props} />
            <NavBar/>
          </div>
          )
        } else {
          return (
            <Redirect
              to={{
                pathname: "/signin",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}
