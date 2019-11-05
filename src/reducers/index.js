import { ADD_HABIT, EDIT_HABIT, DELETE_HABIT } from "../actions";

const initialState = {
  lastId: 0,
  habits: {
    0: {
      title: "Floss yoooo",
      goal: "",
      startDate: "",
      endDate: "",
      streak: [],
      name: "",
      email: ""
    }
  }
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_HABIT: {
      const uid = state.lastId + 1;
      return { lastId: uid, habits: { ...state.habits, [uid]: action.value } };
    }
    case EDIT_HABIT: {
      return {
        ...state,
        habits: { ...state.habits, [action.value.id]: action.value.habit }
      };
    }
    case DELETE_HABIT: {
      console.log(action);
      let id = action.value;
      let newHabits = removeKey(state.habits, id);
      let newState = {
        ...state,
        habits: newHabits
      };
      console.log(state, newState);
      return newState;
    }
    default: {
      return state;
    }
  }
}

// Removes a top-level key from an object, if it exists.
// Immutable.
function removeKey(obj, key) {
  let objectKeys = Object.keys(obj);
  let filteredKeys = objectKeys.filter(objectKey => key !== objectKey);
  return filteredKeys.reduce((accObj, objectKey) => {
    return { ...accObj, [objectKey]: obj[objectKey] };
  }, {});
}
