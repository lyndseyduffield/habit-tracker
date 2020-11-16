import React from "react";
import HabitCard from "../HabitCard";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router";
import { testReducer } from "../../reducers/__tests__/index.test";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(testReducer);

it("renders the habit card correctly when a habit hasn't started", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <StaticRouter>
          <HabitCard id={"0"} collapsed={false} />
        </StaticRouter>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
