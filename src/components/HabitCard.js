import React from "react";
import { connect } from "react-redux";

class HabitCard extends React.Component {
  render() {
    const { title, goal, name, email } = this.props.habit;

    const endDateToString = () => {
      if (this.props.habit.endDate) {
        const endDate = this.props.habit.endDate.toDateString();
        return endDate;
      }
    };

    const startDateToString = () => {
      if (this.props.habit.startDate) {
        const startDate = this.props.habit.startDate.toDateString();
        return startDate;
      }
    };

    return (
      <div>
        <div>
          <h1>{title}</h1>
          <p>{goal}</p>
        </div>
        <div>
          {startDateToString()}
          {endDateToString()}
        </div>
        <div>
          <h3>Accountability Partner</h3>
          <p>name: {name}</p>
          <p>email: {email}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id;

  try {
    id = ownProps.match.params.id;
  } catch {
    id = ownProps.id;
  }

  return {
    habit: state.habits[id]
  };
};

export default connect(mapStateToProps)(HabitCard);
