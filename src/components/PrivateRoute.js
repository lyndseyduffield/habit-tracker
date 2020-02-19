import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// A wrapper component for a Route which makes sure you are logged
// in to view its contents
const PrivateRoute = ({ currentUser, initialized, render, ...props }) => {
  if (initialized) {
    if (currentUser) {
      return <Route {...props} render={render} />;
    } else {
      return (
        <Route
          {...props}
          render={({ location }) => (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )}
        />
      );
    }
  } else {
    // App is still loading from local storage
    return "Loading...";
  }
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    initialized: state.initialized
  };
};

export default connect(mapStateToProps)(PrivateRoute);
