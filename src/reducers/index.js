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
      return { ...state, habits: { ...state.habits, [uid]: action.value } };
    }
    case EDIT_HABIT: {
      return state;
    }
    case DELETE_HABIT: {
      return state;
    }
    default: {
      return state;
    }
  }
}
