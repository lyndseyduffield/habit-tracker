import moment from "moment";
import React, { useState } from "react";
import useForm from "react-hook-form";
import DatePicker from "react-datepicker";
import { editHabit, addHabit } from "../store/actions";
import { connect, ConnectedProps } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { updateHabitStreak } from "../utils/streak";
import { RouteComponentProps } from "react-router-dom";
import { Habit } from "../models/habit";

const connector = connect();

type PropsFromRedux = ConnectedProps<typeof connector>;

type OwnProps = RouteComponentProps & {
  id?: number;
  habit?: Habit;
  now: Date;
};

type Props = PropsFromRedux & OwnProps;

type FormData = {
  title: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  accountabilityPartner: {
    name: string;
    email: string;
  };
};

const HabitForm: React.FC<Props> = (props) => {
  const [state, setState] = useState({
    startDate: props.now,
    endDate: props.now,
  });
  const { register, handleSubmit, setValue, errors } = useForm<FormData>();

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

  const handleDatePickerChange = (key: string, date: Date) => {
    if (key === "startDate" && date > state.endDate) {
      setValue("startDate", date);
      setValue("endDate", date);
      setState({ startDate: date, endDate: date });
    } else {
      setValue(key, date);
      setState({ ...state, [key]: date });
    }
  };

  const onSubmit = (data: FormData) => {
    if (props.habit) {
      const id = props.id;
      const startDate = moment(data.startDate);
      const endDate = moment(data.endDate);
      const habit = updateHabitStreak({
        ...props.habit,
        ...data,
        startDate,
        endDate,
      });
      if (id) {
        props.dispatch(editHabit(habit, id));
      }
    } else {
      const startDate = moment(data.startDate);
      const endDate = moment(data.endDate);
      const habit = updateHabitStreak({
        ...data,
        startDate,
        endDate,
        streak: [],
      });
      props.dispatch(addHabit(habit));
    }
    props.history.push("/home");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label is-large">Habit</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="title"
            defaultValue={props.habit ? props.habit.title : ""}
            placeholder="Your new habit."
            ref={register({ required: true })}
          />
        </div>
        {errors.title && (
          <p className="help is-danger">"A title is required"</p>
        )}
      </div>
      <div className="field">
        <label className="label">Goal</label>
        <div className="control">
          <textarea
            className="textarea"
            name="goal"
            defaultValue={props.habit ? props.habit.goal : ""}
            placeholder="What is your goal?"
            ref={register}
          />
        </div>
      </div>
      <div className="field is-grouped is-horizontal">
        <div className="field-body">
          <div className="field">
            <label className="label">Start Date</label>
            <div className="control">
              <DatePicker
                minDate={props.now}
                selected={state.startDate}
                onChange={(date: Date) => {
                  handleDatePickerChange("startDate", date);
                }}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">End Date</label>
            <div className="control">
              <DatePicker
                minDate={state.startDate}
                selected={state.endDate}
                onChange={(date: Date) => {
                  handleDatePickerChange("endDate", date);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <h3 className="label is-large margin-top">Accountability Partner</h3>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="accountabilityPartner.name"
            defaultValue={
              props.habit?.accountabilityPartner
                ? props.habit.accountabilityPartner.name
                : ""
            }
            placeholder="Your accountability partner's name"
            ref={register({
              maxLength: { value: 40, message: "This name is too long" },
            })}
          />
        </div>
        <p className="help is-danger">
          {errors["accountabilityPartner.name"] ? (
            <span>{errors["accountabilityPartner.name"].message}</span>
          ) : (
            ""
          )}
        </p>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="accountabilityPartner.email"
            defaultValue={
              props.habit?.accountabilityPartner
                ? props.habit.accountabilityPartner.email
                : ""
            }
            placeholder="Their email"
            ref={register({
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email",
              },
            })}
          />
        </div>
        <p className="help is-danger">
          {errors["accountabilityPartner.email"] ? (
            <span>{errors["accountabilityPartner.email"].message}</span>
          ) : (
            ""
          )}
        </p>
      </div>
      <div className="control margin-top">
        <button className="button is-link">Submit</button>
      </div>
    </form>
  );
};

export default connector(HabitForm);
