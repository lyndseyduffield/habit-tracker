import React from "react";
import HabitCard from "../HabitCard";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router";
import { testReducer } from "../../reducers/__tests__/index.test";
import { createStore } from "redux";
import { Provider } from "react-redux";
import moment from "moment";

const store = createStore(testReducer);

const habit = {
  title: "go to the gym",
  goal: "lose some weight",
  accountabilityPartner: { name: "bob smith", email: "bob@gmail.com" },
  startDate: moment("2020-01-28T08:00:00.000Z", moment.ISO_8601).startOf("day"),
  endDate: moment("2020-02-01T08:00:00.000Z", moment.ISO_8601).startOf("day"),
  streak: [true, false, false, false, false],
};

it("renders the habit card correctly", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <StaticRouter>
          <HabitCard id={0} habit={habit} collapsed={false} />
        </StaticRouter>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
