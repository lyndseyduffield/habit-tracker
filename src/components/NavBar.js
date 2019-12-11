import React from "react";
import { Link, withRouter } from "react-router-dom";

class NavBar extends React.Component {
  state = {
    collapsed: false
  };

  toggleView = event => {
    event.preventDefault();
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  };

  changeViewButton = () => {
    if (this.state.collapsed) {
      return <strong>Expand View</strong>;
    } else {
      return <strong>Collapse View</strong>;
    }
  };

  renderDisplay() {
    if (this.props.location.pathname === "/") {
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
                <div
                  onClick={event => this.toggleView(event)}
                  class="button is-light"
                >
                  {this.changeViewButton()}
                </div>
                <Link to="/" class="button is-light">
                  Home
                </Link>
              </div>
            </div>
          </div>
        </nav>
      );
    } else {
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

  render() {
    return <div>{this.renderDisplay()}</div>;
  }
}

export default withRouter(NavBar);
