import React, { useState } from "react";
import useForm from "react-hook-form";
import DatePicker from "react-datepicker";
import { editHabit } from "../actions";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

const EditForm = props => {
  const [state, setState] = useState({
    startDate: new Date(),
    endDate: new Date()
  });
  const { register, handleSubmit, setValue, errors } = useForm();

  React.useEffect(() => {
    register({ name: "startDate" });
    register({ name: "endDate" });
  }, [register, setValue]);

  React.useEffect(() => {
    if (props.habit) {
      setValue("startDate", props.habit.startDate);
      setValue("endDate", props.habit.endDate);
    }
  }, [setValue, props]);

  const handleDatePickerChange = (key, date) => {
    setValue(key, date);
    setState({
      ...state,
      [key]: date
    });
  };

  const onSubmit = data => {
    const id = props.match.params.id;
    const habit = {
      ...props.habit,
      ...data
    };
    props.dispatch(editHabit(habit, id));
    props.history.push("/");
  };

  return (
    <form class="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div class="field">
        <label class="label is-large">Habit</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="title"
            defaultValue={props.habit && props.habit.title}
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
            defaultValue={props.habit && props.habit.goal}
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
                selected={props.habit && props.habit.startDate}
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
                selected={props.habit && props.habit.endDate}
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
            defaultValue={props.habit && props.habit.accountabilityPartner.name}
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
            defaultValue={
              props.habit && props.habit.accountabilityPartner.email
            }
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
      <div class="control margin-top">
        <button class="button is-link">Submit</button>
      </div>
    </form>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    habit: state.habits[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps)(EditForm);
