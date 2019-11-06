import React from "react";
import history from "../history";
import { Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import CreateForm from "./CreateForm";
import EditForm from "./EditForm";
import HabitCard from "./HabitCard";
import { connect } from "react-redux";
import { setState } from "../actions";
import { readState } from "../reducers";

class App extends React.Component {
  componentDidMount() {
    let state = readState();
    this.props.dispatch(setState(state));
  }

  render() {
    return (
      <Router history={history}>
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
