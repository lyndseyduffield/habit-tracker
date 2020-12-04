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
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import NotFound from "./NotFound";
import { connect, ConnectedProps } from "react-redux";
import { setState } from "../store/actions";
import { readState } from "../store/reducers";
import "../css/main.css";
import PrivateRoute from "./PrivateRoute";
import { findUsersKey } from "../utils/users";
import LandingPage from "./LandingPage";
import { State } from "../store/types";

const mapState = (state: State) => {
  const user = state.currentUser;

  return {
    currentUser: user,
    userHabits: user ? state.userStates[user].habits : {},
  };
};

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

  componentDidMount = () => {
    findUsersKey();
    let state = readState();
    this.props.dispatch(setState({ ...state, initialized: true }));
  };

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

  render = () => {
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
            render={(props: RouteComponentProps<{ id: string }>) => {
              const parsedId = +props.match.params.id;
              const habit = !isNaN(parsedId)
                ? this.props.userHabits[parsedId]
                : null;
              if (habit) {
                return (
                  <HabitForm
                    {...props}
                    now={new Date()}
                    id={parsedId}
                    habit={habit}
                  />
                );
              } else {
                return <NotFound />;
              }
            }}
          />
          <PrivateRoute
            path="/:id/show"
            render={(props: RouteComponentProps<{ id: string }>) => {
              const parsedId = +props.match.params.id;
              const habit = !isNaN(parsedId)
                ? this.props.userHabits[parsedId]
                : null;
              if (habit) {
                return (
                  <HabitCard id={parsedId} habit={habit} collapsed={false} />
                );
              } else {
                return <NotFound />;
              }
            }}
          />
        </Switch>
      </Router>
    );
  };
}

export default connector(App);
