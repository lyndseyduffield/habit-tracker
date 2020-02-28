import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const LandingPage = props => {
  const renderLanding = () => {
    return <div>hello</div>;
  };

  return props.currentUser === null ? (
    renderLanding()
  ) : (
    <Redirect to={{ pathname: "/home" }} />
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(LandingPage);
