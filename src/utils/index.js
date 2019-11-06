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
