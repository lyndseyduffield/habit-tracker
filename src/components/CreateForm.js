import React, { useState } from "react";
import useForm from "react-hook-form";
import DatePicker from "react-datepicker";
import { addHabit } from "../actions";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

const TextField = ({ name, placeholder, register }) => {
  return (
    <input type="text" placeholder={placeholder} name={name} ref={register} />
  );
};

const CreateForm = props => {
  const [state, setState] = useState({
    startDate: new Date(),
    endDate: new Date()
  });

  const { register, handleSubmit, setValue } = useForm();

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
    setValue(key, date);
    setState({ ...state, [key]: date });
  };

  // Rendering
  return (
    <form style={{ textAlign: "center" }} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Habit</label>
        <TextField
          name="title"
          placeholder="Your new habit"
          register={register}
        />
        <label>Goal</label>
        <TextField
          name="goal"
          placeholder="What is your goal?"
          register={register}
        />
      </div>

      <div>
        <label>Start Date</label>
        <DatePicker
          selected={state.startDate}
          onChange={date => {
            onDatePickerChange("startDate", date);
          }}
        />
        <label>End Date</label>
        <DatePicker
          selected={state.endDate}
          onChange={date => {
            onDatePickerChange("endDate", date);
          }}
        />
      </div>
      <div>
        <h3>Accountability Partner</h3>
        <label>Name</label>
        <TextField
          name="accountabilityPartner.name"
          placeholder="Your accountability partner's name"
          register={register}
        />
        <TextField
          name="accountabilityPartner.email"
          placeholder="Their email"
          register={register}
        />
      </div>
      <input type="submit" />
    </form>
  );
};

export default connect()(CreateForm);
