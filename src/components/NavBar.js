import React from "react";
import { Link, withRouter } from "react-router-dom";

class NavBar extends React.Component {
  buttonLabel = () => {
    if (this.props.collapsed) {
      return <strong>Expand View</strong>;
    } else {
      return <strong>Collapse View</strong>;
    }
  };

  render() {
    const showView = this.props.location.pathname === "/";
    return (
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
              {showView && (
                <div
                  onClick={event => this.props.toggleCollapse(event)}
                  class="button is-light"
                >
                  {this.buttonLabel()}
                </div>
              )}
              <Link to="/" class="button is-light">
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
