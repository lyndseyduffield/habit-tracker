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
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <div
          className="
            container
            max-w-sm
            mx-auto
            flex-1 flex flex-col
            items-center
            justify-center
            px-2
          "
        >
          <form
            className="bg-white px-6 py-8 rounded-lg shadow-md text-black w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="mb-8 text-3xl text-center">Welcome Back</h1>
            <input
              type="text"
              className="block border border-grey-light w-full
            p-3 rounded mb-4"
              name="username"
              placeholder="Username"
              ref={register({ required: "A username is required" })}
            />
            {errors.username && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 my-4 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold text-red-700">Whoops! </strong>
                <span className="block sm:inline">
                  {errors.username.message}
                </span>
              </div>
            )}
            <input
              type="password"
              className="block border border-grey-light
            w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              ref={register({ required: "A password is required" })}
            />
            {errors.password && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 my-4 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold text-red-700">Whoops! </strong>
                <span className="block sm:inline">
                  {errors.password.message}
                </span>
              </div>
            )}
            <button
              type="submit"
              className="
                w-full
                text-center
                py-3
                rounded
                bg-green-600
                text-white
                hover:bg-green-dark
                focus:outline-none
                my-1
              "
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  };
  return currentUser ? <Redirect to={{ pathname: "/home" }} /> : renderForm();
};

export default connector(LoginForm);
