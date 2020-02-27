import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HabitCard from "./HabitCard";
import { getHabitIds } from "../utils";

class Home extends React.Component {
  habitList() {
    return this.props.habitIds.map(id => {
      return (
        <div key={id}>
          <HabitCard collapsed={this.props.collapsed} id={id} />
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

  render() {
    if (this.props.habitIds.length === 0) {
      return <div class="container">{this.renderEmpty()}</div>;
    } else {
      return <div class="container">{this.habitList()}</div>;
    }
  }
}

const mapStateToProps = state => {
  const user = state.currentUser;
  return user
    ? { habitIds: getHabitIds(state.userStates[user].habits) }
    : { habitIds: [] };
};

export default connect(mapStateToProps)(Home);
