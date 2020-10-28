import { HabitState } from "../models/habit";
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
