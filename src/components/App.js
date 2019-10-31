import React from "react";
import history from "../history";
import { Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import CreateForm from "./CreateForm";
import EditForm from "./EditForm";
import HabitCard from "./HabitCard";

class App extends React.Component {
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

export default App;
