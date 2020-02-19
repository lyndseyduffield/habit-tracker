import React from "react";
import { connect } from "react-redux";
import useForm from "react-hook-form";
import { Redirect } from "react-router-dom";
import { updateCurrentUser } from "../actions";
import { USERS_KEY, checkUser } from "../utils/users";

const LoginForm = ({ currentUser, ...props }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    const users = JSON.parse(window.localStorage.getItem(USERS_KEY));
    if (checkUser(data, users)) {
      props.dispatch(updateCurrentUser(data.username));
      props.history.push("/");
    }
  };

  const renderForm = () => {
    return (
      <form class="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div class="field">
          <label class="label is-large">Username</label>
          <div class="control">
            <input
              class="input"
              type="text"
              name="username"
              placeholder="Your username here"
              ref={register({ required: true })}
            />
          </div>
          {errors.title && <p class="help is-danger">"A title is required"</p>}
        </div>
        <div class="field">
          <label class="label is-large">Password</label>
          <div class="control">
            <input
              class="input"
              type="text"
              name="password"
              placeholder="Your password here"
              ref={register({ required: true })}
            />
          </div>
          {errors.title && <p class="help is-danger">"A title is required"</p>}
        </div>
        <div class="control margin-top">
          <button class="button is-link">Submit</button>
        </div>
      </form>
    );
  };
  return currentUser ? <Redirect to={{ pathname: "/" }} /> : renderForm();
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(LoginForm);
