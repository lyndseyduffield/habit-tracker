import { Habit } from "../models/habit";

// Produces an array of habit ids as strings.
export const getHabitIds = (habitsObj: {
  [index: number]: Habit;
}): string[] => {
  return habitsObj ? Object.keys(habitsObj) : [];
};

// Removes a top-level key from an object, if it exists.
// Immutable.
export function removeKey<T>(obj: { [index: string]: T }, key: string): {} {
  let objectKeys = Object.keys(obj);
  let filteredKeys = objectKeys.filter((objectKey) => key !== objectKey);
  return filteredKeys.reduce((accObj, objectKey) => {
    return { ...accObj, [objectKey]: obj[objectKey] };
  }, {});
}
