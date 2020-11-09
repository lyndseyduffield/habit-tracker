import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { updateCurrentUser } from "../store/actions";
import { getHabitIds } from "../utils";
import { State } from "../store/types";

const mapState = (state: State) => {
  const user = state.currentUser;
  if (user) {
    return {
      habitIds: getHabitIds(state.userStates[user].habits),
    };
  } else {
    return {
      habitIds: [],
    };
  }
};

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux &
  RouteComponentProps & {
    collapsed: boolean;
    toggleCollapse: (event: React.MouseEvent) => void;
  };

class NavBar extends React.Component<Props> {
  buttonLabel = () => {
    if (this.props.collapsed) {
      return <strong>Expand View</strong>;
    } else {
      return <strong>Collapse View</strong>;
    }
  };

  handleLogout = () => {
    let username = null;
    this.props.dispatch(updateCurrentUser(username));
    this.props.history.push("/");
  };

  render() {
    const showView =
      this.props.location.pathname === "/home" &&
      this.props.habitIds.length > 0;
    return (
      <nav className="navbar has-shadow">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <strong>HabitTracker</strong>
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/new" className="button is-light">
                <strong>New Habit</strong>
              </Link>
              {showView && (
                <div
                  onClick={(event) => this.props.toggleCollapse(event)}
                  className="button is-light"
                >
                  {this.buttonLabel()}
                </div>
              )}
              <button
                onClick={() => this.handleLogout()}
                className="button is-light"
              >
                <strong>Logout</strong>
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export const ConnectedNavBar = connector(NavBar);

export default withRouter(ConnectedNavBar);
