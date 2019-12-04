import React from "react";
import { connect } from "react-redux";
import { updateStreak } from "../actions";
import { Link } from "react-router-dom";
import { deleteHabit } from "../actions";
import "../css/main.css";

class HabitCard extends React.Component {
  renderStreak(streak) {
    console.log(streak);
    let lastItem = streak.length - 1;
    return streak.map((check, index) => {
      if (index === lastItem) {
        return (
          <label key={index} class="checkbox is-large checkbox-margin">
            <input
              type="checkbox"
              onChange={event => this.handleStreakClick(event)}
            />
          </label>
        );
      } else {
        return (
          <label key={index} class="checkbox is-large checkbox-margin">
            <input type="checkbox" disabled={true} checked={check} />
          </label>
        );
      }
    });
  }

  handleStreakClick = event => {
    const id = this.props.id || this.props.match.params.id;
    const check = event.target.checked;
    this.props.dispatch(updateStreak(id, check));
  };

  handleDeleteClick = (event, id) => {
    event.preventDefault();
    this.props.dispatch(deleteHabit(id));
  };

  render() {
    const { title, goal, streak, startDate, endDate } = this.props.habit;
    const { name, email } = this.props.habit.accountabilityPartner;
    const endDateToString = endDate ? endDate.toDateString() : null;
    const startDateToString = startDate ? startDate.toDateString() : null;

    return (
      <div class="section">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">{title}</p>
          </header>
          <div class="card-content">
            <div class="content flex-item">
              <div class="flex-element">
                <h3>Goal</h3>
                <p>{goal}</p>
              </div>
              <div class="flex-element">
                <h3>Accountability Partner</h3>
                <p>name: {name}</p>
                <p>email: {email}</p>
              </div>
            </div>
          </div>
          <div class="card-content">
            <div class="content">
              {startDateToString} - {endDateToString}
            </div>
          </div>
          <div class="card-content">
            <div class="content">{this.renderStreak(streak)}</div>
          </div>
          <footer class="card-footer">
            <Link
              class="card-footer-item is-dark"
              to={`/${this.props.id}/edit`}
            >
              <strong>Edit</strong>
            </Link>
            <a
              href="/"
              class="card-footer-item is-dark"
              onClick={event => {
                this.handleDeleteClick(event, this.props.id);
              }}
            >
              <strong>Delete</strong>
            </a>
          </footer>
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
