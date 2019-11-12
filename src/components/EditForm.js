import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { editHabit } from "../actions";
import { connect } from "react-redux";

const EditForm = props => {
  const initialState = {
    title: props.habit.title,
    goal: props.habit.goal,
    startDate: props.habit.startDate,
    endDate: props.habit.endDate,
    accountabilityPartner: props.habit.accountabilityPartner
  };

  const [state, setState] = useState(initialState);

  const handleChange = (key, value) => {
    setState({
      ...state,
      [key]: value
    });
  };

  const handleAccountabilityPartnerChange = (key, value) => {
    setState({
      ...state,
      accountabilityPartner: {
        ...state.accountabilityPartner,
        [key]: value
      }
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const id = props.match.params.id;
    const habit = {
      ...props.habit,
      title: state.title,
      goal: state.goal,
      startDate: state.startDate,
      endDate: state.endDate,
      accountabilityPartner: state.accountabilityPartner
    };
    props.dispatch(editHabit(habit, id));
    props.history.push("/");
  };

  return (
    <div stye={{ textAlign: "center" }}>
      <div>
        <label>Habit</label>
        <input
          type="text"
          placeholder="your new habit"
          value={state.title}
          onChange={event => {
            handleChange("title", event.target.value);
          }}
        />
        <label>Goal</label>
        <input
          type="text"
          placeholder="why do you want to create this new habit?"
          value={state.goal}
          onChange={event => {
            handleChange("goal", event.target.value);
          }}
        />
      </div>
      <div>
        <label>Start Date</label>
        <DatePicker
          selected={state.startDate}
          onChange={date => {
            handleChange("startDate", date);
          }}
        />
        <label>End Date</label>
        <DatePicker
          selected={state.endDate}
          onChange={date => {
            handleChange("endDate", date);
          }}
        />
      </div>
      <div>
        <h3>Accountability Partner</h3>
        <label>Name</label>
        <input
          type="text"
          placeholder="their name"
          value={state.accountabilityPartner.name}
          onChange={event => {
            handleAccountabilityPartnerChange("name", event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="their email"
          value={state.accountabilityPartner.email}
          onChange={event => {
            handleAccountabilityPartnerChange("email", event.target.value);
          }}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    habit: state.habits[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps)(EditForm);
