import { User } from "../models/user";

type LocalStorageKey = "users";

const usersKey: LocalStorageKey = "users";

// the index is a username and the value is a password
type UsersObject = { [index: string]: string };

// A safe alternative to localStorage.getItem which should always be used
// instead of that function
const getLocalStorageItem = (key: LocalStorageKey): string | null => {
  return window.localStorage.getItem(key);
};

const setLocalStorageItem = (key: LocalStorageKey, value: string): void => {
  return window.localStorage.setItem(key, value);
};

// Insert a new user into local storage when they sign up
export const signupUser = (user: User): void => {
  try {
    let item = getLocalStorageItem(usersKey);
    if (item) {
      let oldUsers = JSON.parse(item);
      let newUsers = insertUser(user, oldUsers);
      setLocalStorageItem(usersKey, JSON.stringify(newUsers));
    }
  } catch {
    console.log("Failed to add user due to encoding error");
  }
};

// Inserts a new user and password. Should not overwrite.
export const insertUser = (user: User, users: UsersObject): UsersObject => {
  if (!users[user.username]) {
    return { ...users, [user.username]: user.password };
  } else {
    return users;
  }
};

// Updates an existing users. Should do nothing if the user
// doesn't exist, but overwrites if the user does
export const updateUser = (user: User, users: UsersObject): UsersObject => {
  if (users[user.username]) {
    return { ...users, [user.username]: user.password };
  } else {
    return users;
  }
};

// Check if a username and password combination exists in the users
// when they try to log in
export const checkUser = (user: User, users: UsersObject): boolean => {
  if (users[user.username] && users[user.username] === user.password) {
    return true;
  } else {
    return false;
  }
};

export const findUsersKey = (): void => {
  if (getLocalStorageItem(usersKey) === null) {
    setLocalStorageItem(usersKey, JSON.stringify({}));
  }
};
