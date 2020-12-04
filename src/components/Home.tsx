import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import HabitCard from "./HabitCard";
import { State } from "../store/types";

const mapState = (state: State) => {
  const user = state.currentUser;
  return user ? { habits: state.userStates[user].habits } : { habits: [] };
};

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  collapsed: boolean;
};

class Home extends React.Component<Props> {
  habitList = () => {
    return Object.keys(this.props.habits).map((id) => {
      return (
        <div key={id}>
          <HabitCard
            collapsed={this.props.collapsed}
            habit={this.props.habits[+id]}
            id={+id}
          />
        </div>
      );
    });
  };

  renderEmpty = () => {
    return (
      <div className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Create a New Habit!</h1>
            <div></div>
            <Link to="/new" className="subtitle button banner-button">
              Get to it
            </Link>
          </div>
        </div>
      </div>
    );
  };

  render = () => {
    if (Object.keys(this.props.habits).length === 0) {
      return <div className="container">{this.renderEmpty()}</div>;
    } else {
      return <div className="container">{this.habitList()}</div>;
    }
  };
}

export default connector(Home);
