import { decodeState } from "../index";
import testState from "./testState.json";
import moment from "moment";

const decodedState = {
  lastId: 4,
  habits: {
    3: {
      title: "hjasfhjv",
      goal: "asdf",
      accountabilityPartner: { name: "", email: "" },
      startDate: moment("2020-01-28T08:00:00.000Z", moment.ISO_8601).startOf(
        "day"
      ),
      endDate: moment("2020-02-01T08:00:00.000Z", moment.ISO_8601).startOf(
        "day"
      ),
      streak: [true, false, false, false, false]
    },
    4: {
      title: "ertwet",
      goal: "",
      accountabilityPartner: { name: "", email: "" },
      startDate: moment("2020-02-15T08:00:00.000Z", moment.ISO_8601).startOf(
        "day"
      ),
      endDate: moment("2020-02-20T08:00:00.000Z", moment.ISO_8601).startOf(
        "day"
      ),
      streak: []
    }
  }
};

it("decodes the `state` from local storage", () => {
  expect(decodeState(testState)).toEqual(decodedState);
});
