import { Habit, HabitState } from "../models/habit";
import { Username } from "../models/user";

export interface State {
  initialized: boolean;
  currentUser: Username | null;
  // the key is a Username
  userStates: { [index: string]: UserState };
}

export interface UserState {
  lastId: number;
  habits: HabitState;
}

export const ADD_HABIT = "ADD_HABIT";
export const EDIT_HABIT = "EDIT_HABIT";
export const DELETE_HABIT = "DELETE_HABIT";
export const SET_STATE = "SET_STATE";
export const UPDATE_STREAK = "UPDATE_STREAK";
export const UPDATE_CURRENT_USER = "UPDATE_CURRENT_USER";
export const REGISTER_USER = "REGISTER_USER";

interface AddHabit {
  type: typeof ADD_HABIT;
  payload: Habit;
}

interface EditHabit {
  type: typeof EDIT_HABIT;
  payload: {
    id: number;
    habit: Habit;
  };
}

interface DeleteHabit {
  type: typeof DELETE_HABIT;
  payload: number;
}

interface SetState {
  type: typeof SET_STATE;
  payload: State;
}

interface UpdateStreak {
  type: typeof UPDATE_STREAK;
  payload: {
    id: number;
    check: boolean;
  };
}

interface UpdateCurrentUser {
  type: typeof UPDATE_CURRENT_USER;
  payload: string;
}

interface RegisterUser {
  type: typeof REGISTER_USER;
  payload: string;
}

export type ActionTypes =
  | AddHabit
  | EditHabit
  | DeleteHabit
  | SetState
  | UpdateStreak
  | UpdateCurrentUser
  | RegisterUser;
