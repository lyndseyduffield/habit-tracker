import { Habit } from "../models/habit";
import {
  ActionTypes,
  ADD_HABIT,
  DELETE_HABIT,
  EDIT_HABIT,
  REGISTER_USER,
  SET_STATE,
  State,
  UPDATE_CURRENT_USER,
  UPDATE_STREAK,
} from "./types";

export const addHabit = (habit: Habit): ActionTypes => {
  return {
    type: ADD_HABIT,
    payload: habit,
  };
};

export const editHabit = (habit: Habit, id: number): ActionTypes => {
  return {
    type: EDIT_HABIT,
    payload: {
      id,
      habit,
    },
  };
};

export const deleteHabit = (id: number): ActionTypes => {
  return {
    type: DELETE_HABIT,
    payload: id,
  };
};

export const setState = (state: State): ActionTypes => {
  return {
    type: SET_STATE,
    payload: state,
  };
};

export const updateStreak = (id: number, check: boolean): ActionTypes => {
  return {
    type: UPDATE_STREAK,
    payload: {
      id,
      check,
    },
  };
};

export const updateCurrentUser = (username: string): ActionTypes => {
  return {
    type: UPDATE_CURRENT_USER,
    payload: username,
  };
};

export const registerUser = (username: string): ActionTypes => {
  return {
    type: REGISTER_USER,
    payload: username,
  };
};
