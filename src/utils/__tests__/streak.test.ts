import {
  StreakStatus,
  updateStreak,
  getStreakLength,
  streakStatus,
} from "../streak";
import moment from "moment";
import { Streak } from "../../models/streak";

it("decides status of streak", () => {
  const now = moment("20200203").startOf("day");
  const noStreak: Streak = [];
  const streak = [true, true, false, true, false, true];
  const disabledEndDate = moment("20200115").startOf("day");
  const endDate = moment("20200218").startOf("day");

  expect(streakStatus(noStreak, endDate, now)).toEqual<StreakStatus>(
    "NO_STREAK"
  );
  expect(streakStatus(streak, disabledEndDate, now)).toEqual<StreakStatus>(
    "DISABLED_STREAK"
  );
  expect(streakStatus(streak, endDate, now)).toEqual<StreakStatus>(
    "ACTIVE_STREAK"
  );
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

it("updates the streak if the user hasn't logged in for a few days", () => {
  const now = moment("20200203").startOf("day");
  const startDate = moment("20200128").startOf("day");
  const startDateFuture = moment("20200204").startOf("day");
  const endDate = moment("20200205").startOf("day");
  const endDatePast = moment("20200201").startOf("day");
  const streak = [true, true, true, false, true];
  const futureStreak: Streak = [];

  expect(updateStreak(startDate, endDate, streak, now)).toEqual([
    true,
    true,
    true,
    false,
    true,
    false,
    false,
  ]);
  expect(updateStreak(startDate, endDatePast, streak, now)).toEqual([
    true,
    true,
    true,
    false,
    true,
  ]);
  expect(updateStreak(startDateFuture, endDate, futureStreak, now)).toEqual([]);
});
