import moment from "moment";

export const NO_STREAK = "NO_STREAK";
export const DISABLED_STREAK = "DISABLED_STREAK";
export const ACTIVE_STREAK = "ACTIVE_STREAK";

export const streakStatus = (streak, endDate, now) => {
  // If there is no streak then the habit has not yet begun
  if (streak.length === 0) {
    return NO_STREAK;
  }

  // If now is after the end date then the habit has already ended. If the
  // habit has already ended then the entire streak should be disabled.
  if (now.isAfter(endDate, "days")) {
    return DISABLED_STREAK;
  }

  // Otherwise, the streak is non-empty and is active, so all days in the
  // streak should be disabled except for the last one.
  else {
    return ACTIVE_STREAK;
  }
};

// Given a habit, returns a new habit with a verified streak, updated if
// necessary.
export const updateHabitStreak = habit => {
  const now = moment().startOf("day");
  let newStreak = updateStreak(
    habit.startDate.startOf("day"),
    habit.endDate.startOf("day"),
    habit.streak,
    now
  );
  return { ...habit, streak: newStreak };
};

export const updateStreak = (startDate, endDate, streak, now) => {
  // We need to replace the old streak in case time has passed since the last
  // "user login" occurred
  let newStreak = streak;

  // If the habit hasn't started yet, then the streak should be empty
  if (startDate.isAfter(now, "day")) {
    newStreak = [];
  } else {
    // figure out the correct streak length and current streak length
    const currentLength = streak.length;
    const correctLength = getStreakLength(now, startDate, endDate);

    // figure out if the current streak length is too long, too short, or is correct
    if (correctLength > currentLength) {
      let streakDiff = correctLength - currentLength;
      for (let i = 0; i < streakDiff; i++) {
        newStreak.push(false);
      }
    } else if (correctLength < currentLength) {
      newStreak = newStreak.slice(0, correctLength);
    }
  }

  return newStreak;
};

// Given a date, will return number of days difference from that date and
// today's date until it reached the end date (max difference)
export const getStreakLength = (now, startDate, endDate) => {
  // check whether the end date is later or todays date is later and take
  // the earlier of the two
  if (startDate.isAfter(now, "days")) {
    return 0;
  } else if (endDate.isAfter(now, "days")) {
    return now.diff(startDate, "days") + 1;
  } else {
    return endDate.diff(startDate, "days") + 1;
  }
};
