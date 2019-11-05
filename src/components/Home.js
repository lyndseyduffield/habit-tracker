import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HabitCard from "./HabitCard";
import { getHabitIds } from "../utils";
import { deleteHabit } from "../actions";

class Home extends React.Component {
  habitList() {
    return this.props.habitIds.map(id => {
      return (
        <div key={id}>
          <HabitCard id={id} />
          <Link to={`/${id}/edit`}>Edit</Link>
          <button
            onClick={event => {
              this.handleSubmit(event, id);
            }}
          >
            delete
          </button>
        </div>
      );
    });
  }

  handleSubmit = (event, id) => {
    event.preventDefault();
    this.props.dispatch(deleteHabit(id));
  };

  render() {
    console.log(this.props);
    return <div>{this.habitList()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    habitIds: getHabitIds(state.habits)
  };
};

export default connect(mapStateToProps)(Home);
