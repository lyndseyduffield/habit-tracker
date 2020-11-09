import React from "react";
import HabitForm from "../HabitForm";
import renderer from "react-test-renderer";
import { testReducer } from "../../reducers/__tests__/index.test";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(testReducer);

it("renders the form in edit mode correctly", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <HabitForm
          now={new Date("02/04/2020")}
          match={{
            path: "/:id/edit",
            url: "/0/edit",
            isExact: true,
            params: { id: "0" },
          }}
        />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
