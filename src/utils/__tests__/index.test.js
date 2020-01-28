import { getHabitIds } from "../index";

const habits = {
  0: {},
  1: {}
};

it("retrieves keys from a habits object", () => {
  expect(getHabitIds(null)).toEqual([]);
  expect(getHabitIds({})).toEqual([]);
  expect(getHabitIds(habits)).toEqual(["0", "1"]);
});
