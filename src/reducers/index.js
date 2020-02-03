import moment from "moment";
import { updateHabitStreak, removeKey } from "../utils";
import {
  ADD_HABIT,
  EDIT_HABIT,
  SET_STATE,
  DELETE_HABIT,
  UPDATE_STREAK
} from "../actions";

const initialState = {
  lastId: 0,
  habits: {}
};

const STATE_KEY = "state";

// Write redux state to local storage
// TODO: Make this middleware to remove effects
const writeState = state => {
  window.localStorage.setItem(STATE_KEY, JSON.stringify(state));
};

// Retrieve Redux state from local storage
export const readState = () => {
  try {
    let state = JSON.parse(window.localStorage.getItem(STATE_KEY));
    if (state === {}) {
      return initialState;
    } else {
      const ids = state.habits ? Object.keys(state.habits) : [];

      // Create a new habits object by decoding the date fields for each
      // habit properly
      const decodedHabits = ids.reduce((acc, id) => {
        const parsedHabit = state.habits[id];

        // The date fields have been parsed from strings but have not yet
        // been parsed into moment date objects
        const startDate = moment(parsedHabit.startDate, moment.ISO_8601);
        const endDate = moment(parsedHabit.endDate, moment.ISO_8601);

        // We have to verify that the streak is correct for the habit in
        // the case that time has passed since the last page load
        const newHabit = updateHabitStreak({
          ...parsedHabit,
          startDate,
          endDate
        });

        return { ...acc, [id]: newHabit };
      }, {});

      // Return the state with parsed habits
      return { ...state, habits: decodedHabits };
    }
  } catch {
    /* eslint-disable-next-line no-console */
    console.log("Failed to read state from local storage");
    return initialState;
  }
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    // Use to load the state from local storage when the application
    // starts, but not to set individual habits
    case SET_STATE: {
      return action.value;
    }
    case ADD_HABIT: {
      const uid = state.lastId + 1;
      const newState = {
        lastId: uid,
        habits: { ...state.habits, [uid]: action.value }
      };
      writeState(newState);
      return newState;
    }
    case EDIT_HABIT: {
      const habit = action.value.habit;
      const newState = {
        ...state,
        habits: { ...state.habits, [action.value.id]: habit }
      };
      writeState(newState);
      return newState;
    }
    case DELETE_HABIT: {
      let id = action.value;
      const newState = {
        ...state,
        habits: removeKey(state.habits, id)
      };
      writeState(newState);
      return newState;
    }
    case UPDATE_STREAK: {
      const { id, check } = action.value;
      const habit = state.habits[id];

      let streak = habit.streak;
      streak[streak.length - 1] = check;

      const newState = {
        ...state,
        habits: {
          ...state.habits,
          [id]: { ...habit, streak }
        }
      };

      writeState(newState);
      return newState;
    }
    default: {
      return state;
    }
  }
}
