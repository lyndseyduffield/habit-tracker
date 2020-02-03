import React from "react";
import Checkbox from "./Checkbox.js";
import { connect } from "react-redux";
import { updateStreak } from "../actions";
import { Link } from "react-router-dom";
import {
  NO_STREAK,
  DISABLED_STREAK,
  ACTIVE_STREAK,
  streakStatus
} from "../utils/streak";
import { deleteHabit } from "../actions";
import "../css/main.css";
import moment from "moment";

class HabitCard extends React.Component {
  renderStreak(streak, endDate) {
    const now = moment().startOf("day");
    const status = streakStatus(streak, endDate, now);

    switch (status) {
      case NO_STREAK:
        return <div>This habit hasn't started yet!</div>;
      case DISABLED_STREAK: {
        return streak.map((check, index) => {
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
        });
      }
      case ACTIVE_STREAK: {
        const lastIndex = streak.length - 1;
        return streak.map((check, index) => {
          if (index === lastIndex) {
            return (
              <Checkbox>
                <input
                  key={index}
                  type="checkbox"
                  onChange={event => this.handleStreakClick(event)}
                  checked={check}
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
      default: {
        console.log("Oops! Something went wrong");
      }
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

  renderExpanded() {
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
            <div class="content streak">
              {this.renderStreak(streak, endDate)}
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

  renderCollapsed() {
    const { streak: oldStreak, title, endDate } = this.props.habit;

    let newStreak = oldStreak;

    if (newStreak.length >= 7) {
      const startOfWeek = newStreak.length - 7;
      const endOfWeek = newStreak.length;
      newStreak = newStreak.slice(startOfWeek, endOfWeek);
    }

    return (
      <div>
        <div class="compact-card">
          <div class="compact-card-header">{title}</div>
          <div>{this.renderStreak(newStreak, endDate)}</div>
        </div>
      </div>
    );
  }

  render() {
    const { collapsed } = this.props;
    return collapsed ? this.renderCollapsed() : this.renderExpanded();
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
