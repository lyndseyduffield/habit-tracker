import React from "react";
import { connect } from "react-redux";
import useForm from "react-hook-form";
import { Redirect, Link } from "react-router-dom";
import { updateCurrentUser } from "../actions";
import { USERS_KEY, checkUser } from "../utils/users";

const LoginForm = ({ currentUser, ...props }) => {
  const { register, handleSubmit, errors, setError } = useForm();

  const onSubmit = data => {
    const users = JSON.parse(window.localStorage.getItem(USERS_KEY));
    if (checkUser(data, users)) {
      props.dispatch(updateCurrentUser(data.username));
      props.history.push("/");
    } else {
      setError("username", "notMatch", "invalid username");
      setError("password", "notMatch", "invalid password");
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
              ref={register({
                required: "A username is required"
              })}
            />
          </div>
          {errors.username && (
            <p class="help is-danger">{errors.username.message}</p>
          )}
        </div>
        <div class="field">
          <label class="label is-large">Password</label>
          <div class="control">
            <input
              class="input"
              type="password"
              name="password"
              placeholder="Your password here"
              ref={register({
                required: "A password is required"
              })}
            />
          </div>
          {errors.password && (
            <p class="help is-danger">{errors.password.message}</p>
          )}
        </div>
        <div class="login-buttons">
          <div class="control margin-top">
            <button type="submit" class="button is-link">
              Signin
            </button>
          </div>
          <Link to="/signup" class="control margin-top">
            <button class="button is-link">Sign Up</button>
          </Link>
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
