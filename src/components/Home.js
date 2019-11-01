import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HabitCard from "./HabitCard";
import { getHabitIds } from "../utils";

class Home extends React.Component {
  habitList() {
    return this.props.habitIds.map(id => {
      return (
        <div>
          <HabitCard key={id} id={id} />
          <Link to={`/${id}/edit`}>Edit</Link>
          <button />
        </div>
      );
    });
  }

  onClick = event => {
    event.preventDefault();
  };

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
