import moment from "moment";
import { Middleware } from "redux";
import { AccountabilityPartner } from "../models/habit";
import { Streak } from "../models/streak";
import { removeKey } from "../utils";
import { updateHabitStreak } from "../utils/streak";
import {
  getLocalStorageItem,
  stateKey,
  setLocalStorageItem,
} from "../utils/users";
import {
  ADD_HABIT,
  EDIT_HABIT,
  SET_STATE,
  DELETE_HABIT,
  UPDATE_STREAK,
  UPDATE_CURRENT_USER,
  REGISTER_USER,
  State,
  ActionTypes,
  UserState,
} from "./types";

const initialState: State = {
  initialized: false, // false means the state hasn't been read from localstorage yet
  currentUser: null, // Null means no one is logged in, a string identifies a username
  userStates: {},
};

// Write redux state to local storage
export const writeStateMiddleware: Middleware<{}, State> = (store) => (
  next
) => (action: ActionTypes) => {
  let result = next(action);
  const { initialized, ...state } = store.getState();
  setLocalStorageItem(stateKey, JSON.stringify(state));
  return result;
};

// Retrieve Redux state from local storage
export const readState = (): State => {
  try {
    const stateJson = getLocalStorageItem(stateKey);
    if (stateJson) {
      // TODO: verify that stateJSON parsing succeeded and is of type StateJSON
      const parsedState: StateJSON = JSON.parse(stateJson);
      return decodeState(parsedState);
    }
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error("Failed to read state from local storage", error);
    return initialState;
  }
  return initialState;
};

// Seperate reducer and reduce functions are given different default parameters for state.
export function reducer(state = initialState, action: ActionTypes) {
  return reduce(state, action);
}

// Used to create the main and test reducers, but should not be
// used on its own.
export const reduce = (state: State, action: ActionTypes) => {
  switch (action.type) {
    // Use to load the state from local storage when the application
    // starts, but not to set individual habits
    case SET_STATE: {
      return action.payload;
    }

    case ADD_HABIT: {
      const user = state.currentUser;

      if (user) {
        const userState = state.userStates[user];

        const uid = userState.lastId + 1;
        const newUserState = {
          lastId: uid,
          habits: { ...userState.habits, [uid]: action.payload },
        };

        const newState = {
          ...state,
          userStates: { ...state.userStates, [user]: newUserState },
        };

        return newState;
      } else {
        return state;
      }
    }

    case EDIT_HABIT: {
      const user = state.currentUser;

      if (user) {
        const habit = action.payload.habit;
        const currentUserState = state.userStates[user];

        const newUserState = {
          ...currentUserState,
          habits: {
            ...currentUserState.habits,
            [action.payload.id]: habit,
          },
        };

        const newState = {
          ...state,
          userStates: { ...state.userStates, [user]: newUserState },
        };

        return newState;
      } else {
        return state;
      }
    }

    case DELETE_HABIT: {
      const user = state.currentUser;

      if (user) {
        const id = action.payload;
        const currentUserState = state.userStates[user];

        const newUserState = {
          ...currentUserState,
          habits: removeKey(currentUserState.habits, id),
        };

        const newState = {
          ...state,
          userStates: { ...state.userStates, [user]: newUserState },
        };

        return newState;
      } else {
        return state;
      }
    }

    case UPDATE_STREAK: {
      const user = state.currentUser;
      if (user) {
        let currentUserState = state.userStates[user];

        const { id, check } = action.payload;
        const habit = currentUserState.habits[id];

        const streak = habit.streak;
        streak[streak.length - 1] = check;

        const newUserState = {
          ...currentUserState,
          habits: {
            ...currentUserState.habits,
            [id]: { ...habit, streak },
          },
        };

        const newState = {
          ...state,
          userStates: { ...state.userStates, [user]: newUserState },
        };

        return newState;
      } else {
        return state;
      }
    }

    case UPDATE_CURRENT_USER: {
      const currentUser = action.payload;
      const newState = {
        ...state,
        currentUser,
      };

      return newState;
    }

    case REGISTER_USER: {
      const user = action.payload;
      const habitObj = {
        lastId: 0,
        habits: {},
      };

      const newState = {
        ...state,
        userStates: { ...state.userStates, [user]: habitObj },
      };

      return newState;
    }

    default: {
      return state;
    }
  }
};

type StateJSON = {
  currentUser: string | null;
  userStates: { [index: string]: UserStateJSON };
};

type UserStateJSON = {
  lastId: number;
  habits: {
    [index: string]: HabitJSON;
  };
};

type HabitJSON = {
  startDate: string;
  endDate: string;
  title: string;
  goal: string;
  streak: Streak;
  accountabilityPartner: AccountabilityPartner | null;
};

// Retrieve usable data for the app and redux
// state. It takes a parsed JSON state object
// and returns valid redux state.
export const decodeState = (parsedState: StateJSON): State => {
  let userKeys = Object.keys(parsedState.userStates);

  let decodedUserStates = userKeys.map((user) => {
    let parsed = parsedState.userStates[user];
    return { user, state: decodeUserState(parsed) };
  });

  let accumulatedUserState = decodedUserStates.reduce((acc, userState) => {
    let { user, state } = userState;
    return { ...acc, [user]: state };
  }, {});

  return {
    currentUser: parsedState.currentUser,
    initialized: true,
    userStates: accumulatedUserState,
  };
};

// This decodes an individual users state (habits).
// Expects an object with a lastId and habits key.
export const decodeUserState = (stateJson: UserStateJSON): UserState => {
  const ids = Object.keys(stateJson.habits);

  // Create a new habits object by decoding the date fields for each
  // habit properly
  const decodedHabits = ids.reduce((acc, id) => {
    const parsedHabit = stateJson.habits[id];

    // The date fields have been parsed from strings but have not yet
    // been parsed into moment date objects
    const startDate = moment(parsedHabit.startDate.toString(), moment.ISO_8601);
    const endDate = moment(parsedHabit.endDate.toString(), moment.ISO_8601);

    // We have to verify that the streak is correct for the habit in
    // the case that time has passed since the last page load
    const newHabit = updateHabitStreak({
      ...parsedHabit,
      startDate,
      endDate,
    });

    return { ...acc, [id]: newHabit };
  }, {});

  // Return the state with parsed habits
  return { lastId: stateJson.lastId, habits: decodedHabits };
};
