import moment from "moment";
import { Streak } from "./streak";

export type HabitState = {
  [index: number]: Habit;
};

export interface Habit {
  title: string;
  goal: string;
  endDate: moment.Moment;
  startDate: moment.Moment;
  streak: Streak;
  accountabilityPartner: AccountabilityPartner | null;
}

export interface AccountabilityPartner {
  name: string;
  email: string;
}
