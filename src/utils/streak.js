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
