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
        const habit = state.habits[id];
        const currentStreakLength = habit.streak.length;
        const correctStreakLength = getStreakLength(
          new Date(habit.startDate),
          new Date(habit.endDate)
        );
        const streakDiff = correctStreakLength - currentStreakLength;

        let newStreak = habit.streak;
        for (let i = 1; i <= streakDiff; i++) {
          newStreak.push(false);
        }

        const newHabit = {
          ...habit,
          streak: newStreak,
          startDate: new Date(habit.startDate),
          endDate: new Date(habit.endDate)
        };
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

// Given a date, will return number of days difference from that date and today's date until it reached the end date (max difference)
const getStreakLength = (startDate, endDate) => {
  let diffTime;
  if (new Date() < endDate) {
    diffTime = Math.abs(new Date() - startDate);
  } else {
    diffTime = Math.abs(endDate - startDate);
  }
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1;
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
      const newState = {
        ...state,
        habits: { ...state.habits, [action.value.id]: action.value.habit }
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

// Removes a top-level key from an object, if it exists.
// Immutable.
function removeKey(obj, key) {
  let objectKeys = Object.keys(obj);
  let filteredKeys = objectKeys.filter(objectKey => key !== objectKey);
  return filteredKeys.reduce((accObj, objectKey) => {
    return { ...accObj, [objectKey]: obj[objectKey] };
  }, {});
}
