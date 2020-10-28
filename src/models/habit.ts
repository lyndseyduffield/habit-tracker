import { Moment } from "moment";
import { Streak } from "./streak";

export type HabitState = {
  [index: number]: Habit;
};

export interface Habit {
  title: string;
  goal: string;
  endDate: Moment;
  startDate: Moment;
  streak: Streak;
  accountabilityPartner: AccountabilityPartner | null;
}

export interface AccountabilityPartner {
  name: string;
  email: string;
}
