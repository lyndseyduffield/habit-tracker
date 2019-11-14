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
  const { register, handleSubmit, setValue } = useForm();

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
    <form style={{ textAlign: "center" }} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Habit</label>
        <input
          type="text"
          name="title"
          defaultValue={props.habit && props.habit.title}
          ref={register}
        />
        <label>Goal</label>
        <input
          type="text"
          name="goal"
          defaultValue={props.habit && props.habit.goal}
          ref={register}
        />
      </div>
      <div>
        <label>Start Date</label>
        <DatePicker
          selected={props.habit && props.habit.startDate}
          onChange={date => {
            handleDatePickerChange("startDate", date);
          }}
        />
        <label>End Date</label>
        <DatePicker
          selected={props.habit && props.habit.endDate}
          onChange={date => {
            handleDatePickerChange("endDate", date);
          }}
        />
      </div>
      <div>
        <h3>Accountability Partner</h3>
        <label>Name</label>
        <input
          type="text"
          name="accountabilityPartner.name"
          defaultValue={props.habit && props.habit.accountabilityPartner.name}
          ref={register}
        />
        <input
          type="text'"
          name="accountabilityPartner.email"
          defaultValue={props.habit && props.habit.accountabilityPartner.email}
          ref={register}
        />
      </div>
      <input type="submit" />
    </form>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    habit: state.habits[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps)(EditForm);
