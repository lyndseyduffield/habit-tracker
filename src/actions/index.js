export const ADD_HABIT = "ADD_HABIT";
export const EDIT_HABIT = "EDIT_HABIT";
export const DELETE_HABIT = "DELETE_HABIT";
export const SET_STATE = "SET_STATE";

export const addHabit = habit => {
  const action = {
    type: ADD_HABIT,
    value: habit
  };
  return action;
};

export const editHabit = (habit, id) => {
  const action = {
    type: EDIT_HABIT,
    value: {
      id,
      habit
    }
  };
  return action;
};

export const deleteHabit = id => {
  const action = {
    type: DELETE_HABIT,
    value: id
  };
  return action;
};

export const setState = state => {
  const action = {
    type: SET_STATE,
    value: state
  };
  return action;
};
