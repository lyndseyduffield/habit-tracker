import moment from "moment";
import React, { useState } from "react";
import useForm from "react-hook-form";
import DatePicker from "react-datepicker";
import { addHabit } from "../actions";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import "../css/main.css";
import { updateHabitStreak } from "../utils";

const CreateForm = props => {
  const [state, setState] = useState({
    startDate: new Date(),
    endDate: new Date()
  });

  const { register, handleSubmit, setValue, errors } = useForm();

  React.useEffect(() => {
    register({ name: "startDate" });
    register({ name: "endDate" });
    setValue("startDate", new Date());
    setValue("endDate", new Date());
  }, [register, setValue]);

  const onSubmit = data => {
    const startDate = moment(data.startDate);
    const endDate = moment(data.endDate);
    const habit = updateHabitStreak({
      ...data,
      startDate,
      endDate,
      streak: []
    });
    props.dispatch(addHabit(habit));
    props.history.push("/");
  };

  const onDatePickerChange = (key, date) => {
    if (key === "startDate" && date > state.endDate) {
      setValue("startDate", date);
      setValue("endDate", date);
      setState({ startDate: date, endDate: date });
    } else {
      setValue(key, date);
      setState({ ...state, [key]: date });
    }
  };

  return (
    <div>
      <form class="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div class="field">
          <label class="label is-large">Habit</label>
          <div class="control">
            <input
              class="input"
              type="text"
              name="title"
              placeholder="Your new habit"
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
                  class="dropdown"
                  minDate={new Date()}
                  selected={state.startDate}
                  onChange={date => {
                    onDatePickerChange("startDate", date);
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
                    onDatePickerChange("endDate", date);
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
              placeholder="Your accountability partner's name"
              ref={register({
                maxLength: { value: 40, message: "This name is too long" }
              })}
            />
          </div>
          {errors["accountabilityPartner.name"] && (
            <p class="help is-danger">
              <span>{errors["accountabilityPartner.name"].message}</span>
            </p>
          )}
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              class="input"
              type="text"
              name="accountabilityPartner.email"
              placeholder="Their email"
              ref={register({
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email"
                }
              })}
            />
          </div>
          {errors["accountabilityPartner.email"] && (
            <p class="help is-danger">
              <span>{errors["accountabilityPartner.email"].message}</span>
            </p>
          )}
        </div>
        <div class="control margin-top">
          <button class="button is-link">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default connect()(CreateForm);
