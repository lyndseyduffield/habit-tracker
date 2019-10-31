import React from "react";
import { connect } from "react-redux";

class HabitCard extends React.Component {
  render() {
    console.log(this.props);
    return <div>HabitCard for {this.props.habitId}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    habit: state.habits[ownProps.habitId]
  };
};
export default connect(mapStateToProps)(HabitCard);
