import React from "react";
import Checkbox from "./Checkbox";
import { connect, ConnectedProps } from "react-redux";
import { updateStreak } from "../store/actions";
import { Link } from "react-router-dom";
import {
  NO_STREAK,
  DISABLED_STREAK,
  ACTIVE_STREAK,
  streakStatus,
} from "../utils/streak";
import { deleteHabit } from "../store/actions";
import "../css/main.css";
import moment, { Moment } from "moment";
import { Habit } from "../models/habit";
import { Streak } from "../models/streak";

const connector = connect();

type OwnProps = {
  id: number;
  habit?: Habit;
  collapsed: boolean;
};

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & OwnProps;

class HabitCard extends React.Component<Props> {
  renderStreak(streak: Streak, endDate: Moment) {
    const now = moment().startOf("day");
    const status = streakStatus(streak, endDate, now);

    switch (status) {
      case NO_STREAK:
        return <div>This habit hasn't started yet!</div>;
      case DISABLED_STREAK: {
        return streak.map((check, index) => {
          return (
            <Checkbox key={index} disabled={true}>
              <input type="checkbox" disabled={true} checked={check} />
            </Checkbox>
          );
        });
      }
      case ACTIVE_STREAK: {
        const lastIndex = streak.length - 1;
        return streak.map((check, index) => {
          if (index === lastIndex) {
            return (
              <Checkbox disabled={false} key={index}>
                <input
                  type="checkbox"
                  onChange={(event) => this.handleStreakClick(event)}
                  checked={check}
                />
              </Checkbox>
            );
          } else {
            return (
              <Checkbox disabled={true} key={index}>
                <input type="checkbox" disabled={true} checked={check} />
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

  handleStreakClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = this.props.id;
    const check = event.target.checked;
    this.props.dispatch(updateStreak(id, check));
  };

  handleDeleteClick = (event: React.MouseEvent, id: number) => {
    event.preventDefault();
    this.props.dispatch(deleteHabit(id));
  };

  renderExpanded(habit: Habit) {
    const { title, goal, streak, startDate, endDate } = habit;
    const { name, email } = habit.accountabilityPartner
      ? habit.accountabilityPartner
      : { name: "", email: "" };

    const endDateToString = endDate ? endDate.format("MMMM Do, YYYY") : null;
    const startDateToString = startDate
      ? startDate.format("MMMM Do, YYYY")
      : null;

    return (
      <div className="section">
        <div className="card card-border">
          <header className="card-header card-element-background">
            <p className="card-header-title header-font">{title}</p>
          </header>
          <div className="card-content">
            <div className="content flex-item">
              <div className="flex-element">
                <h3>Goal</h3>
                <p>{goal}</p>
              </div>
              <div className="flex-element">
                <h3>Accountability Partner</h3>
                <p>name: {name}</p>
                <p>email: {email}</p>
              </div>
            </div>
          </div>
          <div className="card-content">
            <div className="content">
              {startDateToString} - {endDateToString}
            </div>
          </div>
          <div className="card-content">
            <div className="content streak">
              {this.renderStreak(streak, endDate)}
            </div>
          </div>
          <footer className="card-footer card-element-background">
            <Link
              className="card-footer-item is-dark"
              to={`/${this.props.id}/edit`}
            >
              <strong>Edit</strong>
            </Link>
            <a
              href="/"
              className="card-footer-item is-dark"
              onClick={(event) => {
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

  renderCollapsed = (habit: Habit) => {
    const { streak: oldStreak, title, endDate } = habit;

    let newStreak = oldStreak;

    if (newStreak.length >= 7) {
      const startOfWeek = newStreak.length - 7;
      const endOfWeek = newStreak.length;
      newStreak = newStreak.slice(startOfWeek, endOfWeek);
    }

    return (
      <div>
        <div className="compact-card">
          <div className="compact-card-header">{title}</div>
          <div>{this.renderStreak(newStreak, endDate)}</div>
        </div>
      </div>
    );
  };

  render = () => {
    const { collapsed, habit } = this.props;
    if (habit) {
      return collapsed
        ? this.renderCollapsed(habit)
        : this.renderExpanded(habit);
    } else {
      return "";
    }
  };
}

export default connector(HabitCard);
