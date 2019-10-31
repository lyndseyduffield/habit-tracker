import React from "react";
import { connect } from "react-redux";
import HabitCard from "./HabitCard";
import { flattenHabits, getHabitIds } from "../utils";

class Home extends React.Component {
  habitList() {
    return this.props.habitIds.map(id => {
      return <HabitCard key={id} habitId={id} />;
    });
  }

  render() {
    return <div>{this.habitList()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    habitIds: getHabitIds(state.habits)
  };
};

export default connect(mapStateToProps)(Home);
