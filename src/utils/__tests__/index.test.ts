import moment from "moment";
import { Habit } from "../../models/habit";
import { getHabitIds, removeKey } from "../index";

const testHabit: Habit = {
  title: "",
  goal: "",
  startDate: moment("20201023"),
  endDate: moment("20201024"),
  streak: [true, false, false],
  accountabilityPartner: {
    name: "",
    email: "",
  },
};

it("retrieves keys from a habits object", () => {
  const habits = {
    0: testHabit,
    1: testHabit,
  };

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
    5: {},
  };

  expect(removeKey(habit, 1)).toEqual({ 0: {}, 2: {}, 3: {}, 4: {}, 5: {} });
  expect(removeKey(habit, 4)).toEqual({ 0: {}, 1: {}, 2: {}, 3: {}, 5: {} });
  expect(removeKey({}, 0)).toEqual({});
});
