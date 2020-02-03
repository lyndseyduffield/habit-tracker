// Expects an object with numeric keys where each key
// is the id of a particular habit. Produces an array
// of habit ids as strings.
export const getHabitIds = habitsObj => {
  return habitsObj ? Object.keys(habitsObj) : [];
};

// Removes a top-level key from an object, if it exists.
// Immutable.
export function removeKey(obj, key) {
  let objectKeys = Object.keys(obj);
  let filteredKeys = objectKeys.filter(objectKey => key !== objectKey);
  return filteredKeys.reduce((accObj, objectKey) => {
    return { ...accObj, [objectKey]: obj[objectKey] };
  }, {});
}
