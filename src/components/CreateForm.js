import React, { useState } from "react";
import useForm from "react-hook-form";
import DatePicker from "react-datepicker";
import { addHabit } from "../actions";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

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
    const habit = {
      ...data,
      streak: [false]
    };
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

  console.log(errors);

  // { startDate, endDate } -> Date -> Effect
  // Check if the start date is before the end date and if not then update ... ... ..

  // Rendering
  return (
    <form class="container" onSubmit={handleSubmit(onSubmit)}>
      <div class="field">
        <label class="label">Habit</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="title"
            placeholder="Your new habit"
            ref={register({ required: true })}
          />
        </div>
        <p class="help is-danger">{errors.title && "A title is required"}</p>
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
      <div class="field is-grouped">
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
      <h3 class="label is-large">Accountability Partner</h3>
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
        <p class="help is-danger">
          {errors["accountabilityPartner.name"] ? (
            <span>{errors["accountabilityPartner.name"].message}</span>
          ) : (
            ""
          )}{" "}
        </p>
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
        <p class="help is-danger">
          {errors["accountabilityPartner.email"] ? (
            <span>{errors["accountabilityPartner.email"].message}</span>
          ) : (
            ""
          )}{" "}
        </p>
      </div>
      <div class="control">
        <button class="button is-link">Submit</button>
      </div>
    </form>
  );
};

export default connect()(CreateForm);
