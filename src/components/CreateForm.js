import React from "react";
import DatePicker from "react-datepicker";
import { addHabit } from "../actions";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      goal: "",
      startDate: new Date(),
      endDate: new Date(),
      accountabilityPartner: {
        name: "",
        email: ""
      }
    };
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  handleAccountabilityPartnerChange = (key, value) => {
    this.setState({
      accountabilityPartner: {
        ...this.state.accountabilityPartner,
        [key]: value
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const habit = {
      title: this.state.title,
      goal: this.state.goal,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      streak: [false],
      accountabilityPartner: this.state.accountabilityPartner
    };
    this.props.dispatch(addHabit(habit));
    this.props.history.push("/");
  };

  render() {
    return (
      <div stye={{ textAlign: "center" }}>
        <div>
          <label>Habit</label>
          <input
            type="text"
            placeholder="your new habit"
            value={this.state.title}
            onChange={event => {
              this.handleChange("title", event.target.value);
            }}
          />
          <label>Goal</label>
          <input
            type="text"
            placeholder="why do you want to create this new habit?"
            value={this.state.goal}
            onChange={event => {
              this.handleChange("goal", event.target.value);
            }}
          />
        </div>
        <div>
          <label>Start Date</label>
          <DatePicker
            selected={this.state.startDate}
            onChange={date => {
              this.handleChange("startDate", date);
            }}
          />
          <label>End Date</label>
          <DatePicker
            selected={this.state.endDate}
            onChange={date => {
              this.handleChange("endDate", date);
            }}
          />
        </div>
        <div>
          <h3>Accountability Partner</h3>
          <label>Name</label>
          <input
            type="text"
            placeholder="their name"
            value={this.state.accountabilityPartner.name}
            onChange={event => {
              this.handleAccountabilityPartnerChange(
                "name",
                event.target.value
              );
            }}
          />
          <input
            type="text"
            placeholder="their email"
            value={this.state.accountabilityPartner.email}
            onChange={event => {
              this.handleAccountabilityPartnerChange(
                "email",
                event.target.value
              );
            }}
          />
        </div>
        <button type="submit" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

export default connect()(CreateForm);
