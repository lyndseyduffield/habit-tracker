import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Form from "./Form";
import HabitCard from "./HabitCard";
import NavBar from "./NavBar";
import SignupForm from "./SignupForm.js";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { setState } from "../actions";
import { readState } from "../reducers";
import "../css/main.css";
import PrivateRoute from "./PrivateRoute";
import { findUsersKey } from "../utils/users";

class App extends React.Component {
  state = {
    collapsed: false
  };

  componentDidMount() {
    findUsersKey();
    let state = readState();
    this.props.dispatch(setState({ ...state, initialized: true }));
  }

  toggleCollapse = event => {
    event.preventDefault();
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  };

  renderNavbar = () => {
    return (
      <NavBar
        collapsed={this.state.collapsed}
        toggleCollapse={this.toggleCollapse}
      />
    );
  };

  render() {
    return (
      <Router basename="/habit-tracker">
        {this.props.currentUser ? this.renderNavbar() : ""}
        <Switch>
          <Route path="/login" render={props => <LoginForm {...props} />} />
          <Route path="/signup" render={props => <SignupForm {...props} />} />
          <PrivateRoute
            exact
            path="/"
            render={props => (
              <Home {...props} collapsed={this.state.collapsed} />
            )}
          />
          <PrivateRoute
            path="/new"
            render={props => <Form {...props} now={new Date()} />}
          />
          <PrivateRoute
            path="/:id/edit"
            render={props => <Form {...props} now={new Date()} />}
          />
          <PrivateRoute path="/:id/show" component={HabitCard} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(App);
