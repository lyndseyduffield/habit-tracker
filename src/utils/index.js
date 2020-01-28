import moment from "moment";

// Expects an object with numeric keys where each key
// is the id of a particular habit. Produces an array
// of habit ids as strings.
export const getHabitIds = habitsObj => {
  return habitsObj ? Object.keys(habitsObj) : [];
};

export const flattenHabits = habitsObj => {
  let ids = getHabitIds(habitsObj);
  return ids.map(id => {
    return {
      id,
      title: habitsObj[id]["title"]
    };
  });
};

// Given a habit, returns a new habit with a verified streak, updated if
// necessary.
export const updateHabitStreak = habit => {
  const startDate = habit.startDate.startOf("day");
  const endDate = habit.endDate.startOf("day");
  const now = moment().startOf("day");

  // We need to replace the old streak in case time has passed since the last
  // "user login" occurred
  let newStreak = habit.streak;

  // If the habit hasn't started yet, then the streak should be empty
  if (startDate.isAfter(now, "day")) {
    newStreak = [];
  } else {
    // figure out the correct streak length and current streak length
    const currentLength = habit.streak.length;
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

  return { ...habit, streak: newStreak };
};

// Given a date, will return number of days difference from that date and
// today's date until it reached the end date (max difference)
const getStreakLength = (now, startDate, endDate) => {
  // check whether the end date is later or todays date is later and take
  // the earlier of the two
  if (endDate.isAfter(now, "days")) {
    return now.diff(startDate, "days") + 1;
  } else {
    return endDate.diff(startDate, "days") + 1;
  }
};
