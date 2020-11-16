import React from "react";
import { connect, ConnectedProps } from "react-redux";
import useForm from "react-hook-form";
import { updateCurrentUser, registerUser } from "../store/actions";
import { usersKey, signupUser, getLocalStorageItem } from "../utils/users";
import { RouteComponentProps } from "react-router-dom";

const connector = connect();

type PropsFromRedux = ConnectedProps<typeof connector>;

type OwnProps = RouteComponentProps;

type Props = PropsFromRedux & OwnProps;

type FormData = {
  username: string;
  password: string;
  verifypassword: string;
};

const SignupForm: React.FC<Props> = (props) => {
  const { register, handleSubmit, errors, setError } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const usersFromLocalStorage = getLocalStorageItem(usersKey);

    if (usersFromLocalStorage) {
      const users = JSON.parse(usersFromLocalStorage);

      if (users[data.username]) {
        setError("username", "invalid", "Username is not available");
      } else if (data.password !== data.verifypassword) {
        setError("password", "notMatch", "Passwords must match.");
        setError("password", "notMatch", "Passwords must match.");
      } else {
        let user = {
          username: data.username,
          password: data.password,
        };

        signupUser(user);

        props.dispatch(registerUser(user.username));
        props.dispatch(updateCurrentUser(user.username));
        props.history.push("/home");
      }
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label is-large">Username</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="username"
            placeholder="Your username here"
            ref={register({
              required: "A username is required",
            })}
          />
        </div>
        {errors.username && (
          <p className="help is-danger">{errors.username.message}</p>
        )}
      </div>
      <div className="field">
        <label className="label is-large">Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Your password here"
            ref={register({
              required: "A password is required",
            })}
          />
        </div>
        {errors.password && (
          <p className="help is-danger">{errors.password.message}</p>
        )}
      </div>
      <div className="field">
        <label className="label is-large">Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            name="verifypassword"
            placeholder="Your password here"
            ref={register({
              required: "A password is required",
            })}
          />
        </div>
        {errors.password && (
          <p className="help is-danger">{errors.password.message}</p>
        )}
      </div>
      <div className="control margin-top">
        <button type="submit" className="button is-link">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default connector(SignupForm);
