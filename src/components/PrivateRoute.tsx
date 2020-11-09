import React from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Username } from "../models/user";
import { State } from "../store/types";

interface PrivateRouteProps {
  currentUser: Username | null;
  initialized: boolean;
  render: (props: RouteComponentProps<any>) => React.ReactNode;
  [index: string]: any;
}

// A wrapper component for a Route which makes sure you are logged
// in to view its contents
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  currentUser,
  initialized,
  render,
  ...props
}) => {
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
                state: { from: location },
              }}
            />
          )}
        />
      );
    }
  } else {
    // App is still loading from local storage
    return <div>Loading...</div>;
  }
};

const mapStateToProps = (state: State) => {
  return {
    currentUser: state.currentUser,
    initialized: state.initialized,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
