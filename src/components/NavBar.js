import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateCurrentUser } from "../actions";
import { getHabitIds } from "../utils";

class NavBar extends React.Component {
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
  };

  render() {
    const showView =
      this.props.location.pathname === "/" && this.props.habitIds.length > 0;
    return (
      <nav class="navbar has-shadow">
        <div class="navbar-brand">
          <Link to="/" class="navbar-item">
            <strong>HabitTracker</strong>
          </Link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <Link to="/new" class="button is-light">
                <strong>New Habit</strong>
              </Link>
              {showView && (
                <div
                  onClick={event => this.props.toggleCollapse(event)}
                  class="button is-light"
                >
                  {this.buttonLabel()}
                </div>
              )}
              <button
                onClick={event => this.handleLogout(event)}
                class="button is-light"
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

const mapStateToProps = state => {
  const user = state.currentUser;
  if (user) {
    return {
      habitIds: getHabitIds(state.userStates[user].habits)
    };
  } else {
    return {
      habitIds: []
    };
  }
};

export const ConnectedNavBar = connect(mapStateToProps)(NavBar);

export default withRouter(ConnectedNavBar);
