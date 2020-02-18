import moment from "moment";
import React, { useState } from "react";
import useForm from "react-hook-form";
import DatePicker from "react-datepicker";
import { editHabit, addHabit } from "../actions";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { updateHabitStreak } from "../utils/streak";

const Form = props => {
  const [state, setState] = useState({
    startDate: props.now,
    endDate: props.now
  });
  const { register, handleSubmit, setValue, errors } = useForm();

  React.useEffect(() => {
    register({ name: "startDate" });
    register({ name: "endDate" });
  }, [register, setValue]);

  React.useEffect(() => {
    if (props.habit) {
      const startDate = props.habit.startDate.toDate();
      const endDate = props.habit.endDate.toDate();
      setValue("startDate", startDate);
      setValue("endDate", endDate);
      setState({ startDate, endDate });
    } else {
      setValue("startDate", props.now);
      setValue("endDate", props.now);
    }
  }, [setValue, props]);

  const handleDatePickerChange = (key, date) => {
    if (key === "startDate" && date > state.endDate) {
      setValue("startDate", date);
      setValue("endDate", date);
      setState({ startDate: date, endDate: date });
    } else {
      setValue(key, date);
      setState({ ...state, [key]: date });
    }
  };

  const onSubmit = data => {
    if (props.habit) {
      const id = props.match.params.id;
      const startDate = moment(data.startDate);
      const endDate = moment(data.endDate);
      const habit = updateHabitStreak({
        ...props.habit,
        ...data,
        startDate,
        endDate
      });
      props.dispatch(editHabit(habit, id));
    } else {
      const startDate = moment(data.startDate);
      const endDate = moment(data.endDate);
      const habit = updateHabitStreak({
        ...data,
        startDate,
        endDate,
        streak: []
      });
      props.dispatch(addHabit(habit));
    }
    props.history.push("/");
  };

  console.log(props);

  return (
    <form class="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div class="field">
        <label class="label is-large">Habit</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="title"
            defaultValue={props.habit ? props.habit.title : ""}
            placeholder="Your new habit."
            ref={register({ required: true })}
          />
        </div>
        {errors.title && <p class="help is-danger">"A title is required"</p>}
      </div>
      <div class="field">
        <label class="label">Goal</label>
        <div class="control">
          <textarea
            class="textarea"
            type="text"
            name="goal"
            defaultValue={props.habit ? props.habit.goal : ""}
            placeholder="What is your goal?"
            ref={register}
          />
        </div>
      </div>
      <div class="field is-grouped is-horizontal">
        <div class="field-body">
          <div class="field">
            <label class="label">Start Date</label>
            <div class="control">
              <DatePicker
                minDate={props.now}
                selected={state.startDate}
                onChange={date => {
                  handleDatePickerChange("startDate", date);
                }}
              />
            </div>
          </div>
          <div class="field">
            <label class="label">End Date</label>
            <div class="control">
              <DatePicker
                minDate={state.startDate}
                selected={state.endDate}
                onChange={date => {
                  handleDatePickerChange("endDate", date);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <h3 class="label is-large margin-top">Accountability Partner</h3>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="accountabilityPartner.name"
            defaultValue={
              props.habit ? props.habit.accountabilityPartner.name : ""
            }
            placeholder="Your accountability partner's name"
            ref={register({
              maxLength: { value: 40, message: "This name is too long" }
            })}
          />
        </div>
        <p class="help is-danger">
          {errors["accountabilityPartner.name"] ? (
            <span>{errors["accountabilityPartner.name"].message}</span>
          ) : (
            ""
          )}
        </p>
      </div>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="accountabilityPartner.email"
            defaultValue={
              props.habit ? props.habit.accountabilityPartner.email : ""
            }
            placeholder="Their email"
            ref={register({
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email"
              }
            })}
          />
        </div>
        <p class="help is-danger">
          {errors["accountabilityPartner.email"] ? (
            <span>{errors["accountabilityPartner.email"].message}</span>
          ) : (
            ""
          )}
        </p>
      </div>
      <div class="control margin-top">
        <button class="button is-link">Submit</button>
      </div>
    </form>
  );
};

const mapStateToProps = (state, ownProps) => {
  const user = state.currentUser;
  if (user) {
    return {
      habit: state.userStates[user].habits[ownProps.match.params.id]
    };
  } else {
    return {
      habit: null
    };
  }
};

export default connect(mapStateToProps)(Form);
