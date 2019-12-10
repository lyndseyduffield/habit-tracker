import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import Checkbox from "./Checkbox";
import { updateStreak } from "../actions";
import "../css/main.css";

class CompactCard extends React.Component {
  renderStreak(streak, endDate) {
    // If there is no streak then the habit has not yet begun
    if (streak.length === 0) {
      return <div>This habit hasn't started yet!</div>;
    }

    // If now is after the end date then the habit has already ended. If the
    // habit has already ended then the entire streak should be disabled.
    const now = moment().startOf("day");
    if (now.isAfter(endDate, "days")) {
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

    // Otherwise, the streak is non-empty and is active, so all days in the
    // streak should be disabled except for the last one.
    else {
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
  }

  handleStreakClick = event => {
    const id = this.props.id || this.props.match.params.id;
    const check = event.target.checked;
    this.props.dispatch(updateStreak(id, check));
  };

  render() {
    const { streak: oldStreak, title, endDate } = this.props.habit;

    let newStreak = oldStreak;

    if (newStreak.length >= 7) {
      const startOfWeek = newStreak.length - 7;
      const endOfWeek = newStreak.length;
      newStreak = newStreak.slice(startOfWeek, endOfWeek);
    }

    return (
      <div class="compact-card">
        <div class="compact-card-header">{title}</div>
        <div>{this.renderStreak(newStreak, endDate)}</div>
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

export default connect(mapStateToProps)(CompactCard);
