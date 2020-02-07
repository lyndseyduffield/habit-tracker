import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
//import CreateForm from "./CreateForm";
import Form from "./Form";
import HabitCard from "./HabitCard";
import NavBar from "./NavBar";
import { connect } from "react-redux";
import { setState } from "../actions";
import { readState } from "../reducers";
import "../css/main.css";

class App extends React.Component {
  state = {
    collapsed: false
  };

  toggleCollapse = event => {
    event.preventDefault();
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  };

  componentDidMount() {
    let state = readState();
    this.props.dispatch(setState(state));
  }

  render() {
    return (
      <Router basename="/habit-tracker">
        <NavBar
          collapsed={this.state.collapsed}
          toggleCollapse={this.toggleCollapse}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home {...props} collapsed={this.state.collapsed} />
            )}
          />
          <Route
            path="/new"
            render={props => <Form {...props} now={new Date()} />}
          />
          <Route
            path="/:id/edit"
            render={props => <Form {...props} now={new Date()} />}
          />
          <Route path="/:id/show" component={HabitCard} />
        </Switch>
      </Router>
    );
  }
}

export default connect()(App);
