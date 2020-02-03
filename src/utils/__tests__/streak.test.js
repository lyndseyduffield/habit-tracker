import {
  getStreakLength,
  streakStatus,
  NO_STREAK,
  DISABLED_STREAK,
  ACTIVE_STREAK
} from "../streak";
import moment from "moment";

it("decides status of streak", () => {
  const now = moment("20200203").startOf("day");
  const noStreak = [];
  const streak = [true, true, false, true, false, true];
  const disabledEndDate = moment("20200115").startOf("day");
  const endDate = moment("20200218").startOf("day");

  expect(streakStatus(noStreak, endDate, now)).toEqual(NO_STREAK);
  expect(streakStatus(streak, disabledEndDate, now)).toEqual(DISABLED_STREAK);
  expect(streakStatus(streak, endDate, now)).toEqual(ACTIVE_STREAK);
});

it("gets the correct streak length", () => {
  const past = moment("20200128").startOf("day");
  const now = moment("20200203").startOf("day");
  const future = moment("20200220").startOf("day");

  expect(getStreakLength(now, now, now)).toEqual(1);
  expect(getStreakLength(now, past, future)).toEqual(7);
  expect(getStreakLength(now, past, past)).toEqual(1);
  expect(getStreakLength(now, future, future)).toEqual(0);
});
