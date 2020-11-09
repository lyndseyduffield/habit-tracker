import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import Home from "./Home";
import HabitForm from "./HabitForm";
import HabitCard from "./HabitCard";
import NavBar from "./NavBar";
import SignupForm from "./SignupForm.js";
import LoginForm from "./LoginForm";
import { connect, ConnectedProps } from "react-redux";
import { setState } from "../store/actions";
import { readState } from "../store/reducers";
import "../css/main.css";
import PrivateRoute from "./PrivateRoute";
import { findUsersKey } from "../utils/users";
import LandingPage from "./LandingPage";
import { State } from "../store/types";

const mapState = (state: State) => ({
  currentUser: state.currentUser,
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

type MyState = {
  collapsed: boolean;
};

class App extends React.Component<Props, MyState> {
  state: MyState = {
    collapsed: false,
  };

  componentDidMount() {
    findUsersKey();
    let state = readState();
    this.props.dispatch(setState({ ...state, initialized: true }));
  }

  toggleCollapse = (event: React.MouseEvent) => {
    event.preventDefault();
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed,
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
          <Route
            exact
            path="/"
            render={(props) => <LandingPage {...props} />}
          />
          <Route path="/login" render={(props) => <LoginForm {...props} />} />
          <Route path="/signup" render={(props) => <SignupForm {...props} />} />
          <PrivateRoute
            path="/home"
            render={(props: RouteComponentProps) => (
              <Home {...props} collapsed={this.state.collapsed} />
            )}
          />
          <PrivateRoute
            path="/new"
            render={(props: RouteComponentProps) => (
              <HabitForm {...props} now={new Date()} />
            )}
          />
          <PrivateRoute
            path="/:id/edit"
            render={(props: RouteComponentProps<{ id: string }>) => (
              <HabitForm {...props} now={new Date()} />
            )}
          />
          <PrivateRoute
            path="/:id/show"
            render={(props: RouteComponentProps<{ id: string }>) => (
              <HabitCard id={props.match.params.id} collapsed={false} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default connector(App);
