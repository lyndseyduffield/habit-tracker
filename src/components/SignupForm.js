import React from "react";
import { connect } from "react-redux";
import useForm from "react-hook-form";
import { updateCurrentUser, registerUser } from "../actions";
import { USERS_KEY, signupUser } from "../utils/users";

const SignupForm = props => {
  const { register, handleSubmit, errors, setError } = useForm();

  const onSubmit = data => {
    const users = JSON.parse(window.localStorage.getItem(USERS_KEY));

    if (users[data.username]) {
      setError("username", "invalid", "Username is not available");
    } else if (data.password !== data.verifypassword) {
      setError("password", "notMatch", "Passwords must match.");
      setError("password", "notMatch", "Passwords must match.");
    } else {
      let user = {
        username: data.username,
        password: data.password
      };

      signupUser(user);

      props.dispatch(registerUser(user.username));
      props.dispatch(updateCurrentUser(user.username));
      props.history.push("/");
    }
  };

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
      <div class="field">
        <label class="label is-large">Password</label>
        <div class="control">
          <input
            class="input"
            type="password"
            name="verifypassword"
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
      <div class="control margin-top">
        <button type="submit" class="button is-link">
          Signin
        </button>
      </div>
    </form>
  );
};

export default connect()(SignupForm);
