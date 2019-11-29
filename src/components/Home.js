import React from "react";
import { connect } from "react-redux";
import HabitCard from "./HabitCard";
import { getHabitIds } from "../utils";

class Home extends React.Component {
  habitList() {
    return this.props.habitIds.map(id => {
      return (
        <div key={id}>
          <HabitCard id={id} />
        </div>
      );
    });
  }

  render() {
    return <div class="container">{this.habitList()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    habitIds: getHabitIds(state.habits)
  };
};

export default connect(mapStateToProps)(Home);
