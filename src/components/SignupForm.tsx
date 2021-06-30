import React from "react";
import { connect, ConnectedProps } from "react-redux";
import useForm from "react-hook-form";
import { updateCurrentUser, registerUser } from "../store/actions";
import { usersKey, signupUser, getLocalStorageItem } from "../utils/users";
import { RouteComponentProps, Link } from "react-router-dom";

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

  console.log(props);

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
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3
        rounded mb-4"
            name="username"
            placeholder="Username"
            ref={register({
              required: "A username is required",
            })}
          />
          {errors.username && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 my-4 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold text-red-700">Whoops! </strong>
              <span className="block sm:inline">{errors.username.message}</span>
            </div>
          )}
          <input
            type="password"
            className="block border border-grey-light w-full
        p-3 rounded mb-4"
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
              <span className="block sm:inline">{errors.password.message}</span>
            </div>
          )}
          <input
            type="password"
            className="block border border-grey-light w-full
        p-3 rounded mb-4"
            name="verifypassword"
            placeholder="Confirm Password"
            ref={register({ required: "A password is required" })}
          />
          {errors.password && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 my-4 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold text-red-700">Whoops! </strong>
              <span className="block sm:inline">{errors.password.message}</span>
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
            Create Account
          </button>
        </form>

        <div className="text-grey-dark mt-6">
          Already have an account?{" "}
          <Link
            className="no-underline border-b border-blue text-blue"
            to="/login"
          >
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default connector(SignupForm);
