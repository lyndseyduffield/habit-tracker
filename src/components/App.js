import React from "react";
import history from "../history";
import { Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import { Link } from "react-router-dom";
import CreateForm from "./CreateForm";
import EditForm from "./EditForm";
import HabitCard from "./HabitCard";
import { connect } from "react-redux";
import { setState } from "../actions";
import { readState } from "../reducers";
import "../css/main.css";

class App extends React.Component {
  componentDidMount() {
    let state = readState();
    this.props.dispatch(setState(state));
  }

  render() {
    return (
      <Router history={history}>
        <nav class="navbar has-shadow">
          <div class="navbar-brand">
            <div class="navbar-item">
              <strong>HabitTracker</strong>
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <Link to="/new" class="button is-light">
                  <strong>New Habit</strong>
                </Link>
                <Link to="/" class="button is-light">
                  Home
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/new" component={CreateForm} />
          <Route path="/:id/edit" component={EditForm} />
          <Route path="/:id/show" component={HabitCard} />
        </Switch>
      </Router>
    );
  }
}

export default connect()(App);
