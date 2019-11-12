import React from "react";
import { connect } from "react-redux";
import { updateStreak } from "../actions";

class HabitCard extends React.Component {
  renderStreak(streak) {
    let lastItem = streak.length - 1;
    return streak.map((check, index) => {
      if (index === lastItem) {
        return (
          <input
            key={index}
            type="checkbox"
            onChange={event => this.handleStreakClick(event)}
          />
        );
      } else {
        return (
          <input key={index} type="checkbox" disabled={true} checked={check} />
        );
      }
    });
  }

  handleStreakClick = event => {
    const id = this.props.id || this.props.match.params.id;
    const check = event.target.checked;
    this.props.dispatch(updateStreak(id, check));
  };

  render() {
    const { title, goal, streak, startDate, endDate } = this.props.habit;
    const { name, email } = this.props.habit.accountabilityPartner;
    const endDateToString = endDate ? endDate.toDateString() : null;
    const startDateToString = startDate ? startDate.toDateString() : null;

    return (
      <div>
        <div>
          <h1>{title}</h1>
          <p>{goal}</p>
        </div>
        <div>
          {startDateToString}
          {endDateToString}
        </div>
        <div>{this.renderStreak(streak)}</div>
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
