export const USERS_KEY = "users";

// Insert a new user into local storage when they sign up
export const signupUser = user => {
  try {
    let oldUsers = JSON.parse(window.localStorage.getItem(USERS_KEY));
    let newUsers = insertUser(user, oldUsers);
    window.localStorage.setItem(USERS_KEY, JSON.stringify(newUsers));
  } catch {
    console.log("Failed to add user due to encoding error");
  }
};

// Inserts a new user and password. Should not overwrite.
export const insertUser = (user, users) => {
  if (!users[user.username]) {
    return { ...users, [user.username]: user.password };
  } else {
    return users;
  }
};

// Updates an existing users. Should do nothing if the user
// doesn't exist, but overwrites if the user does
export const updateUser = (user, users) => {
  if (users[user.username]) {
    return { ...users, [user.username]: user.password };
  } else {
    return users;
  }
};

// Check if a username and password combination exists in the users
// when they try to log in
export const checkUser = (user, users) => {
  if (users[user.username] && users[user.username] === user.password) {
    return true;
  } else {
    return false;
  }
};
