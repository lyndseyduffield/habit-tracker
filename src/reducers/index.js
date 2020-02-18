import moment from "moment";
import { removeKey } from "../utils";
import { updateHabitStreak } from "../utils/streak";
import {
  ADD_HABIT,
  EDIT_HABIT,
  SET_STATE,
  DELETE_HABIT,
  UPDATE_STREAK
} from "../actions";

const initialState = {
  currentUser: null, // Null means no one is logged in, a string identifies a username
  userStates: {}
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
    let stateJson = JSON.parse(window.localStorage.getItem(STATE_KEY));
    return decodeState(stateJson);
  } catch {
    /* eslint-disable-next-line no-console */
    console.log("Failed to read state from local storage");
    return initialState;
  }
};

export function reducer(state = initialState, action) {
  return reduce(state, action);
}

// Used to create the main and test reducers, but should not be
// used on its own.
export function reduce(state, action) {
  switch (action.type) {
    // Use to load the state from local storage when the application
    // starts, but not to set individual habits
    case SET_STATE: {
      return action.value;
    }

    case ADD_HABIT: {
      const user = state.currentUser;

      if (user) {
        const userState = state.userStates[user];

        const uid = userState.lastId + 1;
        const newUserState = {
          lastId: uid,
          habits: { ...userState.habits, [uid]: action.value }
        };

        const newState = {
          ...state,
          userStates: { ...state.userStates, [user]: newUserState }
        };

        writeState(newState);

        return newState;
      } else {
        return state;
      }
    }

    case EDIT_HABIT: {
      const user = state.currentUser;

      if (user) {
        const habit = action.value.habit;
        const currentUserState = state.userStates[user];

        const newUserState = {
          ...currentUserState,
          habits: {
            ...currentUserState.habits,
            [action.value.id]: habit
          }
        };

        const newState = {
          ...state,
          userStates: { ...state.userStates, [user]: newUserState }
        };

        writeState(newState);

        return newState;
      } else {
        return state;
      }
    }

    case DELETE_HABIT: {
      const user = state.currentUser;

      if (user) {
        const id = action.value;
        const currentUserState = state.userStates[user];

        const newUserState = {
          ...currentUserState,
          habits: removeKey(currentUserState.habits, id)
        };

        const newState = {
          ...state,
          userStates: { ...state.userStates, [user]: newUserState }
        };

        writeState(newState);

        return newState;
      } else {
        return state;
      }
    }

    case UPDATE_STREAK: {
      const user = state.currentUser;
      if (user) {
        let currentUserState = state.userStates[user];

        const { id, check } = action.value;
        const habit = currentUserState.habits[id];

        const streak = habit.streak;
        streak[streak.length - 1] = check;

        const newUserState = {
          ...currentUserState,
          habits: {
            ...currentUserState.habits,
            [id]: { ...habit, streak }
          }
        };

        const newState = {
          ...state,
          userStates: { ...state.userStates, [user]: newUserState }
        };

        writeState(newState);

        return newState;
      } else {
        return state;
      }
    }

    default: {
      return state;
    }
  }
}

// Retrieve usable data for the app and redux
// state. It takes a parsed JSON state object
// and returns valid redux state.
export const decodeState = parsedState => {
  let userKeys = Object.keys(parsedState.userStates);

  let decodedUserStates = userKeys.map(user => {
    return { user, state: decodeUserState(parsedState.userStates[user]) };
  });

  let accumulatedUserState = decodedUserStates.reduce((acc, userState) => {
    let { user, state } = userState;
    return { ...acc, [user]: state };
  }, {});

  return { ...parsedState, userStates: accumulatedUserState };
};

// This decodes an individual users state (habits).
// Expects an object with a lastId and habits key.
export const decodeUserState = stateJson => {
  if (stateJson === {}) {
    return initialState;
  } else {
    const ids = stateJson.habits ? Object.keys(stateJson.habits) : [];

    // Create a new habits object by decoding the date fields for each
    // habit properly
    const decodedHabits = ids.reduce((acc, id) => {
      const parsedHabit = stateJson.habits[id];

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
    return { ...stateJson, habits: decodedHabits };
  }
};
