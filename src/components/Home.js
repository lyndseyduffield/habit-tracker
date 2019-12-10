import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HabitCard from "./HabitCard";
import { getHabitIds } from "../utils";
import CompactCard from "./CompactCard";

class Home extends React.Component {
  state = {
    collapsed: false
  };

  habitList() {
    return this.props.habitIds.map(id => {
      return (
        <div key={id}>
          <HabitCard id={id} />
        </div>
      );
    });
  }

  compactHabitList() {
    return this.props.habitIds.map(id => {
      return (
        <div key={id}>
          <CompactCard id={id} />
        </div>
      );
    });
  }

  renderEmpty = () => {
    return (
      <div class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">Create a New Habit!</h1>
            <div></div>
            <Link to="/new" class="subtitle button banner-button">
              Get to it
            </Link>
          </div>
        </div>
      </div>
    );
  };

  renderDisplay = () => {
    if (this.props.habitIds.length === 0) {
      return <div class="container">{this.renderEmpty()}</div>;
    } else if (this.state.collapsed) {
      return (
        <div class="container compact-container">{this.compactHabitList()}</div>
      );
    } else {
      return <div class="container">{this.habitList()}</div>;
    }
  };

  changeViewButton = () => {
    if (this.state.collapsed) {
      return <strong>Expand View</strong>;
    } else {
      return <strong>Collapse View</strong>;
    }
  };

  toggleView = event => {
    event.preventDefault();
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  };

  render() {
    console.log(this.state);
    return (
      <div>
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
        {this.renderDisplay()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    habitIds: getHabitIds(state.habits)
  };
};

export default connect(mapStateToProps)(Home);
