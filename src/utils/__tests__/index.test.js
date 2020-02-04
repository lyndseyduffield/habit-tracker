import { getHabitIds, removeKey } from "../index";

it("retrieves keys from a habits object", () => {
  const habits = {
    0: {},
    1: {}
  };

  expect(getHabitIds(null)).toEqual([]);
  expect(getHabitIds({})).toEqual([]);
  expect(getHabitIds(habits)).toEqual(["0", "1"]);
});

it("removes the key (habit) from the habit object", () => {
  const habit = {
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
    5: {}
  };

  expect(removeKey(habit, "1")).toEqual({ 0: {}, 2: {}, 3: {}, 4: {}, 5: {} });
  expect(removeKey(habit, "4")).toEqual({ 0: {}, 1: {}, 2: {}, 3: {}, 5: {} });
  expect(removeKey({}, "0")).toEqual({});
});
