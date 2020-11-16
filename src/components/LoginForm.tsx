import React from "react";
import { connect, ConnectedProps } from "react-redux";
import useForm from "react-hook-form";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { updateCurrentUser } from "../store/actions";
import { usersKey, getLocalStorageItem, checkUser } from "../utils/users";
import { State } from "../store/types";

const mapState = (state: State) => {
  return {
    currentUser: state.currentUser,
  };
};

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

type OwnProps = RouteComponentProps;

type Props = PropsFromRedux & OwnProps;

type FormData = {
  username: string;
  password: string;
};

const LoginForm: React.FC<Props> = ({ currentUser, ...props }) => {
  const { register, handleSubmit, errors, setError } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const usersFromLocalStorage = getLocalStorageItem(usersKey);
    if (usersFromLocalStorage) {
      const users = JSON.parse(usersFromLocalStorage);

      if (checkUser(data, users)) {
        props.dispatch(updateCurrentUser(data.username));
        props.history.push("/home");
      } else {
        setError("username", "notMatch", "invalid username");
        setError("password", "notMatch", "invalid password");
      }
    }
  };

  const renderForm = () => {
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
        <div className="login-buttons">
          <div className="control margin-top">
            <button type="submit" className="button is-link">
              Sign In
            </button>
          </div>
        </div>
      </form>
    );
  };
  return currentUser ? <Redirect to={{ pathname: "/home" }} /> : renderForm();
};

export default connector(LoginForm);
