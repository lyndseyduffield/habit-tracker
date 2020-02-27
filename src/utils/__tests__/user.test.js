import { insertUser, updateUser, checkUser } from "../users";

it("inserts a new user into the user object", () => {
  const user = { username: "thomashoneyman", password: "password" };
  const users = {};
  const userAlreadyThere = { thomashoneyman: "oldpassword" };

  expect(insertUser(user, users)).toEqual({ thomashoneyman: "password" });
  expect(insertUser(user, userAlreadyThere)).toEqual({
    thomashoneyman: "oldpassword"
  });
});

it("updates an existing users' data in the user object", () => {
  const user = { username: "thomashoneyman", password: "newpassword" };
  const users = { thomashoneyman: "password" };
  const userDoesntExist = {};

  expect(updateUser(user, users)).toEqual({ thomashoneyman: "newpassword" });
  expect(updateUser(user, userDoesntExist)).toEqual({});
});

it("checks if a username/password pair already exists in the user object", () => {
  const user = { username: "thomashoneyman", password: "password" };
  const users = { thomashoneyman: "password" };
  const usernameDoesntMatch = { thoneyman: "password" };
  const passwordDoesntMatch = { thomashoneyman: "wrongpassword" };

  expect(checkUser(user, passwordDoesntMatch)).toEqual(false);
  expect(checkUser(user, usernameDoesntMatch)).toEqual(false);
  expect(checkUser(user, users)).toEqual(true);
});
