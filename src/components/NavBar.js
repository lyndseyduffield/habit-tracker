import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getHabitIds } from "../utils";

class NavBar extends React.Component {
  buttonLabel = () => {
    if (this.props.collapsed) {
      return <strong>Expand View</strong>;
    } else {
      return <strong>Collapse View</strong>;
    }
  };

  render() {
    console.log(this.props);
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

const mapStateToProps = state => {
  return {
    habitIds: getHabitIds(state.habits)
  };
};

export default connect(mapStateToProps)(withRouter(NavBar));
