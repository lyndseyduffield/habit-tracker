import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const LoginForm = ({ currentUser, ...props }) => {
  const renderForm = <div>Suuuup</div>;
  return currentUser ? <Redirect to={{ pathname: "/" }} /> : renderForm;
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(LoginForm);
