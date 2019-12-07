import React from "react";
import Checkbox from "./Checkbox.js";
import { connect } from "react-redux";
import { updateStreak } from "../actions";
import { Link } from "react-router-dom";
import { deleteHabit } from "../actions";
import "../css/main.css";

class HabitCard extends React.Component {
  renderStreak(streak, endDate, startDate) {
    const fullStreakLength = endDate.diff(startDate, "days");
    if (streak.length <= 0) {
      return <div>This habit hasn't started yet, YA LOSER</div>;
    } else {
      let lastItem = streak.length - 1;
      return streak.map((check, index) => {
        if (index === lastItem && lastItem < fullStreakLength) {
          return (
            <Checkbox>
              <input
                key={index}
                type="checkbox"
                onChange={event => this.handleStreakClick(event)}
              />
            </Checkbox>
          );
        } else {
          return (
            <Checkbox disabled={true}>
              <input
                key={index}
                type="checkbox"
                disabled={true}
                checked={check}
              />
            </Checkbox>
          );
        }
      });
    }
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
    const endDateToString = endDate ? endDate.format("MMMM Do, YYYY") : null;
    const startDateToString = startDate
      ? startDate.format("MMMM Do, YYYY")
      : null;

    return (
      <div class="section">
        <div class="card card-border">
          <header class="card-header card-element-background">
            <p class="card-header-title header-font">{title}</p>
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
            <div class="content">
              {this.renderStreak(streak, endDate, startDate)}
            </div>
          </div>
          <footer class="card-footer card-element-background">
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
