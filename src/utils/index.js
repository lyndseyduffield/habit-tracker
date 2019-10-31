export const getHabitIds = habitsObj => Object.keys(habitsObj);

export const flattenHabits = habitsObj => {
  let ids = Object.keys(habitsObj);
  return ids.map(id => {
    return {
      id,
      title: habitsObj[id]["title"]
    };
  });
};
