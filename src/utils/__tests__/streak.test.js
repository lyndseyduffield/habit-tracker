import {
  streakStatus,
  NO_STREAK,
  DISABLED_STREAK,
  ACTIVE_STREAK
} from "../streak";
import moment from "moment";

const now = moment("20200203").startOf("day");
const noStreak = [];
const streak = [true, true, false, true, false, true];
const disabledEndDate = moment("20200115").startOf("day");
const endDate = moment("20200218").startOf("day");

it("decides status of streak", () => {
  expect(streakStatus(noStreak, endDate, now)).toEqual(NO_STREAK);
  expect(streakStatus(streak, disabledEndDate, now)).toEqual(DISABLED_STREAK);
  expect(streakStatus(streak, endDate, now)).toEqual(ACTIVE_STREAK);
});
